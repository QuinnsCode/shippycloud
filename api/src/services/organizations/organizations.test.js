import {
  organizations,
  organization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from './organizations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organizations', () => {
  scenario('returns all organizations', async (scenario) => {
    const result = await organizations()

    expect(result.length).toEqual(Object.keys(scenario.organization).length)
  })

  scenario('returns a single organization', async (scenario) => {
    const result = await organization({ id: scenario.organization.one.id })

    expect(result).toEqual(scenario.organization.one)
  })

  scenario('creates a organization', async () => {
    const result = await createOrganization({
      input: { name: 'String', updatedAt: '2025-01-27T06:13:20.017Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-01-27T06:13:20.017Z'))
  })

  scenario('updates a organization', async (scenario) => {
    const original = await organization({
      id: scenario.organization.one.id,
    })
    const result = await updateOrganization({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a organization', async (scenario) => {
    const original = await deleteOrganization({
      id: scenario.organization.one.id,
    })
    const result = await organization({ id: original.id })

    expect(result).toEqual(null)
  })
})
