// const liveQueryStore = createLiveQueryStore()

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } _context - contains information about the invocation,
 * function, and execution environment.
 */

import { organization } from 'src/services/organizations/organizations'
import { createWebhookEventLog } from 'src/services/webhookEventLogs/webhookEventLogs'

export const handler = async (event, incomingContext) => {
  // console.log('Handler called with: ' + event.path) // Debug log

  // console.log('Received request:', {
  //   method: event.httpMethod,
  //   path: event.path,
  //   body: event.body,
  // })

  //reject if not a put or post

  if (event.httpMethod !== 'POST' && event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      headers: {
        Allow: 'POST, PUT',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  // console.log('Raw path:', event.path)
  // console.log('Split result:', event.path.split('/w/'))

  //get the orgId from the path
  const orgId = event.path.split('/w/')[1]
  // console.log('orgId ' + orgId)
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is required' }),
      }
    }

    const foundOrg = await organization({ id: orgId })

    if (!foundOrg) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Organization not found' }),
      }
    }

    // Try to parse body, attempt base64 decode if regular parse fails
    let webhookData
    try {
      webhookData = JSON.parse(event.body)
    } catch (parseError) {
      try {
        // Attempt base64 decode
        const decoded = Buffer.from(event.body, 'base64').toString()
        // console.log('Decoded body:', decoded)
        webhookData = JSON.parse(decoded)
      } catch (decodeError) {
        // console.error('Failed to parse body as JSON or base64:', {
        //   originalError: parseError,
        //   decodeError,
        //   rawBody: event.body,
        // })
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid request body format' }),
        }
      }
    }

    const eventType = webhookData?.resource_type || 'webhook.resourceType'
    const webhookType = event?.queryStringParameters?.type || 'webhookType'

    // Save to WebhookEventLog
    await createWebhookEventLog({
      input: {
        organizationId: foundOrg.id,
        event: eventType,
        source: webhookType,
        payload: JSON.stringify(webhookData),
      },
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Webhook received and logged',
        organizationId: foundOrg.id,
      }),
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
