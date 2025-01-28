import {
  endpoints,
  endpoint,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
} from './endpoints'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('endpoints', () => {
  scenario('returns all endpoints', async (scenario) => {
    const result = await endpoints()

    expect(result.length).toEqual(Object.keys(scenario.endpoint).length)
  })

  scenario('returns a single endpoint', async (scenario) => {
    const result = await endpoint({ id: scenario.endpoint.one.id })

    expect(result).toEqual(scenario.endpoint.one)
  })

  scenario('creates a endpoint', async (scenario) => {
    const result = await createEndpoint({
      input: {
        organizationId: scenario.endpoint.two.organizationId,
        name: 'String',
        endpointType: 'String',
        createdByUserId: 'String',
        updatedAt: '2025-01-28T06:02:36.340Z',
      },
    })

    expect(result.organizationId).toEqual(scenario.endpoint.two.organizationId)
    expect(result.name).toEqual('String')
    expect(result.endpointType).toEqual('String')
    expect(result.createdByUserId).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-01-28T06:02:36.340Z'))
  })

  scenario('updates a endpoint', async (scenario) => {
    const original = await endpoint({
      id: scenario.endpoint.one.id,
    })
    const result = await updateEndpoint({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a endpoint', async (scenario) => {
    const original = await deleteEndpoint({
      id: scenario.endpoint.one.id,
    })
    const result = await endpoint({ id: original.id })

    expect(result).toEqual(null)
  })
})
