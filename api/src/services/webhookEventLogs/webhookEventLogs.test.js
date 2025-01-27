import {
  webhookEventLogs,
  webhookEventLog,
  createWebhookEventLog,
  updateWebhookEventLog,
  deleteWebhookEventLog,
} from './webhookEventLogs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('webhookEventLogs', () => {
  scenario('returns all webhookEventLogs', async (scenario) => {
    const result = await webhookEventLogs()

    expect(result.length).toEqual(Object.keys(scenario.webhookEventLog).length)
  })

  scenario('returns a single webhookEventLog', async (scenario) => {
    const result = await webhookEventLog({
      id: scenario.webhookEventLog.one.id,
    })

    expect(result).toEqual(scenario.webhookEventLog.one)
  })

  scenario('creates a webhookEventLog', async (scenario) => {
    const result = await createWebhookEventLog({
      input: {
        organizationId: scenario.webhookEventLog.two.organizationId,
        event: 'String',
        source: 'String',
        payload: 'String',
      },
    })

    expect(result.organizationId).toEqual(
      scenario.webhookEventLog.two.organizationId
    )
    expect(result.event).toEqual('String')
    expect(result.source).toEqual('String')
    expect(result.payload).toEqual('String')
  })

  scenario('updates a webhookEventLog', async (scenario) => {
    const original = await webhookEventLog({
      id: scenario.webhookEventLog.one.id,
    })
    const result = await updateWebhookEventLog({
      id: original.id,
      input: { event: 'String2' },
    })

    expect(result.event).toEqual('String2')
  })

  scenario('deletes a webhookEventLog', async (scenario) => {
    const original = await deleteWebhookEventLog({
      id: scenario.webhookEventLog.one.id,
    })
    const result = await webhookEventLog({ id: original.id })

    expect(result).toEqual(null)
  })
})
