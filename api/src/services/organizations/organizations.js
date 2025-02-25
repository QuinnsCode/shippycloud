import { db } from 'src/lib/db'

export const organizations = () => {
  return db.organization.findMany()
}

export const organizationsOfAUser = ({ userId }) => {
  return db.organization.findMany({
    where: { members: { some: { userId } } },
  })
}

export const organization = ({ id }) => {
  return db.organization.findUnique({
    where: { id },
  })
}

export const createOrganization = ({ input }) => {
  return db.organization.create({
    data: input,
  })
}

// createOrganizationAndCreateOrganizationMember
export const createOrganizationAndCreateOrganizationMember = async ({
  input,
}) => {
  const { userId, ...organizationData } = input

  try {
    // create the organization
    const organization = await db.organization.create({
      data: organizationData,
    })

    // add the user as a member
    await db.organizationMember.create({
      data: {
        userId,
        organizationId: organization.id,
        role: 'ADMIN',
      },
    })

    return organization
  } catch (error) {
    throw new Error(
      `Error creating organization or adding member: ${error.message}`
    )
  }
}

export const updateOrganization = ({ id, input }) => {
  return db.organization.update({
    data: input,
    where: { id },
  })
}

// Server-side function - `organization.js` service file
export const updateOrganizationSettings = async ({ organizationId, input }) => {
  const { userId, key, value } = input

  // console.log('Updating organization settings:', { organizationId, input })
  // Fetch the organization to ensure user authorization
  const organization = await db.organization.findUnique({
    where: { id: organizationId },
    select: {
      organizationSettings: true,
      members: {
        where: { userId: userId },
        select: { userId: true, name: true },
      },
    },
  })

  // Authorization check using `userId` to verify if they are in `members`
  // console.log(organization.members)
  const isMember = organization.members.some(
    (member) => member.userId === userId
  )

  if (!isMember) {
    throw new Error('User not authorized to update settings')
  }

  // Update logic for organization settings
  const currentSettings = JSON.parse(organization.organizationSettings || '{}')

  const newSettings = {
    ...currentSettings,
    [key]: typeof value !== 'undefined' ? value : null,
  }

  // Update database with new settings
  return db.organization.update({
    data: { organizationSettings: JSON.stringify(newSettings) },
    where: { id: organizationId },
  })
}

export const deleteOrganization = async ({ id }) => {
  // Delete all organization members before deleting the organization
  await db.organizationMember.deleteMany({
    where: { organizationId: id },
  })

  // Delete the organization
  return db.organization.delete({
    where: { id },
  })
}

export const Organization = {
  members: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).members()
  },
  webhooksEventLogs: (_obj, { root }) => {
    return db.organization
      .findUnique({ where: { id: root?.id } })
      .webhooksEventLogs()
  },
  orderData: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).orderData()
  },
}
