import crypto from 'crypto'

import { validateApiKey } from 'src/lib/apivalidate'
import { db } from 'src/lib/db'

// Existing organization services
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

export const updateOrganizationSettings = async ({ organizationId, input }) => {
  const { userId, key, value } = input

  // Fetch the organization to ensure user authorization
  const organization = await db.organization.findUnique({
    where: { id: organizationId },
    select: {
      organizationSettings: true,
      members: {
        where: { userId: userId },
        select: { userId: true, role: true },
      },
    },
  })

  // Authorization check using `userId` to verify if they are in `members`
  const member = organization.members.find((member) => member.userId === userId)

  if (!member) {
    throw new Error('User not authorized to update settings')
  }

  if (member.role !== 'ADMIN') {
    throw new Error('Only admins can update organization settings')
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

// Original userAndOrganizationSettings service
export const userAndOrganizationSettings = async ({
  userId,
  organizationId,
}) => {
  // Find the organization member with the user's role
  const orgMember = await db.organizationMember.findFirst({
    where: {
      userId: userId,
      organizationId: organizationId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          id: true,
          name: true,
          organizationSettings: true,
        },
      },
    },
  })

  if (!orgMember) {
    throw new Error('User is not a member of this organization')
  }

  // Determine if the user is an admin
  const isAdmin = orgMember.role === 'ADMIN'

  // Construct response with conditional fields based on role
  return {
    id: `${userId}-${organizationId}`,
    userId: userId,
    organizationId: organizationId,
    // Include user data
    name: orgMember.user.name,
    email: orgMember.user.email,
    // Include organization data
    organizationName: orgMember.organization.name,
    // Include role information
    role: orgMember.role,
    isAdmin,
    // Only include settings if user is an admin
    organizationSettings: isAdmin
      ? orgMember.organization.organizationSettings
      : null,
  }
}

// New service - userAndOrganizationWithKeys
export const userAndOrganizationWithKeys = async ({
  userId,
  organizationId,
}) => {
  // Find the organization member with the user's role
  const orgMember = await db.organizationMember.findFirst({
    where: {
      userId: userId,
      organizationId: organizationId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          id: true,
          name: true,
          organizationSettings: true,
          apiKeys: {
            where: {
              isActive: true,
            },
            select: {
              id: true,
              provider: true,
            },
          },
        },
      },
    },
  })

  if (!orgMember) {
    throw new Error('User is not a member of this organization')
  }

  // Determine if the user is an admin
  const isAdmin = orgMember.role === 'ADMIN'

  // Extract API key information
  const hasApiKeys = orgMember.organization.apiKeys?.length > 0
  const apiKeyProviders = isAdmin
    ? orgMember.organization.apiKeys.map((key) => key.provider)
    : []

  // Construct response with conditional fields based on role
  return {
    id: `${userId}-${organizationId}`,
    userId: userId,
    organizationId: organizationId,
    // Include user data
    name: orgMember.user.name,
    email: orgMember.user.email,
    // Include organization data
    organizationName: orgMember.organization.name,
    // Include role information
    role: orgMember.role,
    isAdmin,
    // Only include settings if user is an admin
    organizationSettings: isAdmin
      ? orgMember.organization.organizationSettings
      : null,
    // Include API key information
    hasApiKeys,
    apiKeyProviders: isAdmin ? apiKeyProviders : [],
  }
}

// API Key Services
export const organizationApiKeys = ({ organizationId }) => {
  return db.organizationApiKey.findMany({
    where: {
      organizationId,
      isActive: true,
    },
    select: {
      id: true,
      provider: true,
      label: true,
      isActive: true,
      lastUsedAt: true,
      createdBy: true,
      createdAt: true,
    },
  })
}

export const createOrganizationApiKey = async ({ input }) => {
  const { organizationId, provider, label, apiKey, createdBy } = input

  // First verify the user is an admin of the organization
  const member = await db.organizationMember.findFirst({
    where: {
      userId: createdBy,
      organizationId,
      role: 'ADMIN',
    },
  })

  if (!member) {
    throw new Error('Only organization admins can create API keys')
  }

  // Test the API key before saving it
  try {
    await validateApiKey(provider, apiKey)
  } catch (error) {
    throw new Error(error.message)
  }

  // Encrypt the API key
  const keySalt = crypto.randomBytes(16).toString('hex')
  const keyIv = crypto.randomBytes(12).toString('hex')
  const key = crypto.scryptSync(
    process.env.API_KEY_SECRET || 'default-secret',
    keySalt,
    32
  )

  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(keyIv, 'hex')
  )

  let encrypted = cipher.update(apiKey, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const keyTag = cipher.getAuthTag().toString('hex')

  // Check if there's already an API key for this provider
  const existingKey = await db.organizationApiKey.findFirst({
    where: {
      organizationId,
      provider,
    },
  })

  if (existingKey) {
    // Update the existing key
    return db.organizationApiKey.update({
      where: { id: existingKey.id },
      data: {
        encryptedKey: encrypted,
        keyIv,
        keyTag,
        keySalt,
        label,
        isActive: true,
        createdBy,
        lastUsedAt: new Date(), // Update last used since we just tested it
      },
    })
  }

  // Create a new API key
  return db.organizationApiKey.create({
    data: {
      organization: { connect: { id: organizationId } },
      provider,
      label,
      encryptedKey: encrypted,
      keyIv,
      keyTag,
      keySalt,
      isActive: true,
      createdBy,
      lastUsedAt: new Date(), // Set last used since we just tested it
    },
    select: {
      id: true,
      provider: true,
      label: true,
      isActive: true,
      lastUsedAt: true,
      createdBy: true,
      createdAt: true,
    },
  })
}

export const deleteOrganizationApiKey = async ({ id }) => {
  // We'll just mark it as inactive rather than deleting
  return db.organizationApiKey.update({
    where: { id },
    data: { isActive: false },
    select: {
      id: true,
      provider: true,
      label: true,
      isActive: true,
      lastUsedAt: true,
      createdBy: true,
      createdAt: true,
    },
  })
}

// Resolvers
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
  apiKeys: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).apiKeys({
      where: { isActive: true },
    })
  },
}
