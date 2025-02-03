import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const webhookEventLogs = () => {
  return db.webhookEventLog.findMany()
}

export const webhookEventLogsOfAnOrg = ({ organizationId }) => {
  return db.webhookEventLog.findMany({
    orderBy: { createdAt: 'desc' },
    where: { organizationId },
  })
}

export const webhookEventLog = ({ id }) => {
  return db.webhookEventLog.findUnique({
    where: { id },
  })
}

// api/src/services/webhookEventLogs/webhookEventLogs.js
// In your webhookEventLogs service
export const createWebhookEventLog = async ({ input }, contextArg) => {
  console.log('Creating webhook log for org: ' + input.organizationId)

  // console.log(contextArg)
  const webhookEventLog = await db.webhookEventLog.create({
    data: input,
  })

  // Explicitly destructure pubSub and liveQueryStore from context
  const { pubSub, liveQueryStore } = context

  console.log('Publishing webhook for org: ' + input.organizationId)

  if (pubSub && typeof pubSub.publish === 'function') {
    try {
      pubSub.publish('onWebhookReceived', input.organizationId, webhookEventLog)
    } catch (error) {
      console.error('Error publishing webhook event:', error)
    }
    console.log('Successfully published webhook event')
  } else {
    console.error('PubSub is not a function', { pubSub })
  }

  if (liveQueryStore) {
    // try {
    //   liveQueryStore.invalidate(
    //     `Query.liveWebhookEventLogsOfAnOrg:${input.organizationId}`
    //   )
    //   console.log('Live query invalidation attempted')
    // } catch (error) {
    //   console.error('Failed to publish webhook event:', error)
    // }
  } else {
    console.error('LiveQueryStore not available', { liveQueryStore })
  }

  return webhookEventLog
}

export const updateWebhookEventLog = ({ id, input }) => {
  return db.webhookEventLog.update({
    data: input,
    where: { id },
  })
}

export const deleteWebhookEventLog = ({ id }) => {
  return db.webhookEventLog.delete({
    where: { id },
  })
}

export const WebhookEventLog = {
  organization: (_obj, { root }) => {
    return db.webhookEventLog
      .findUnique({ where: { id: root?.id } })
      .organization()
  },
}
