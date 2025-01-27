import {
  organizationMembers,
  organizationMember,
  createOrganizationMember,
  updateOrganizationMember,
  deleteOrganizationMember,
} from './organizationMembers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organizationMembers', () => {
  scenario('returns all organizationMembers', async (scenario) => {
    const result = await organizationMembers()

    expect(result.length).toEqual(
      Object.keys(scenario.organizationMember).length
    )
  })

  scenario('returns a single organizationMember', async (scenario) => {
    const result = await organizationMember({
      id: scenario.organizationMember.one.id,
    })

    expect(result).toEqual(scenario.organizationMember.one)
  })

  scenario('creates a organizationMember', async (scenario) => {
    const result = await createOrganizationMember({
      input: {
        userId: scenario.organizationMember.two.userId,
        organizationId: scenario.organizationMember.two.organizationId,
        role: 'String',
        updatedAt: '2025-01-27T06:15:09.437Z',
      },
    })

    expect(result.userId).toEqual(scenario.organizationMember.two.userId)
    expect(result.organizationId).toEqual(
      scenario.organizationMember.two.organizationId
    )
    expect(result.role).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2025-01-27T06:15:09.437Z'))
  })

  scenario('updates a organizationMember', async (scenario) => {
    const original = await organizationMember({
      id: scenario.organizationMember.one.id,
    })
    const result = await updateOrganizationMember({
      id: original.id,
      input: { role: 'String2' },
    })

    expect(result.role).toEqual('String2')
  })

  scenario('deletes a organizationMember', async (scenario) => {
    const original = await deleteOrganizationMember({
      id: scenario.organizationMember.one.id,
    })
    const result = await organizationMember({ id: original.id })

    expect(result).toEqual(null)
  })
})
