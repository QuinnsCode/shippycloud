import { ForbiddenError, UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { encrypt, decrypt } from 'src/lib/encryption'

const validateOrganizationAccess = async (organizationId, context) => {
  // console.log(organizationId)
  // console.log(context)
  if (!context?.currentUser?.id) {
    throw new ForbiddenError('Authentication required')
  }

  const membership = await db.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: context.currentUser.id,
        organizationId,
      },
    },
  })

  if (!membership || !['ADMIN', 'OWNER'].includes(membership.role)) {
    throw new ForbiddenError('Not authorized to manage API keys')
  }
}

export const createOrganizationApiKey = async ({ input }, { context }) => {
  // Input validation
  if (!input) {
    throw new UserInputError('Input is required')
  }

  if (!input.organizationId) {
    throw new UserInputError('Organization ID is required')
  }

  if (!input.provider) {
    throw new UserInputError('Provider is required')
  }

  if (!input.apiKey) {
    throw new UserInputError('API key is required')
  }

  try {
    // Validate organization access first
    await validateOrganizationAccess(input.organizationId, context)

    // Encrypt the API key
    const encryptedData = encrypt(input.apiKey)

    if (!encryptedData) {
      throw new Error('Failed to encrypt API key')
    }

    // Create the API key record
    const newApiKey = await db.organizationApiKey.create({
      data: {
        organizationId: input.organizationId,
        provider: input.provider,
        label: input.label || '',
        encryptedKey: encryptedData.encrypted,
        keyIv: encryptedData.iv,
        keyTag: encryptedData.tag,
        keySalt: encryptedData.salt,
        createdBy: context.currentUser.id,
      },
    })

    if (!newApiKey) {
      throw new Error('Failed to create API key record')
    }

    return newApiKey
  } catch (error) {
    console.error('Error in createOrganizationApiKey:', error)

    if (error instanceof ForbiddenError || error instanceof UserInputError) {
      throw error
    }

    throw new Error(`Failed to create API key: ${error.message}`)
  }
}
