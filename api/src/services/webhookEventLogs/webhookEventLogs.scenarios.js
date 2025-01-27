export const standard = defineScenario({
  webhookEventLog: {
    one: {
      data: {
        event: 'String',
        source: 'String',
        payload: 'String',
        organization: {
          create: { name: 'String', updatedAt: '2025-01-27T06:15:32.136Z' },
        },
      },
    },
    two: {
      data: {
        event: 'String',
        source: 'String',
        payload: 'String',
        organization: {
          create: { name: 'String', updatedAt: '2025-01-27T06:15:32.137Z' },
        },
      },
    },
  },
})
