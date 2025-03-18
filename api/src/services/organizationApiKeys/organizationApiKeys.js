import { ForbiddenError, UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { encrypt, decrypt } from 'src/lib/encryption'

const validateOrganizationAccess = async (organizationId, context) => {
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

/**
 * Ensures API key is in a consistent format by removing 'Basic ' prefix if present
 * @param {string} key - API key that may or may not have 'Basic ' prefix
 * @returns {string} API key without 'Basic ' prefix
 */
const normalizeApiKey = (key) => {
  if (!key) return ''
  const trimmed = key.trim()
  return trimmed.startsWith('Basic ') ? trimmed.substring(6).trim() : trimmed
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

    // Normalize the API key - remove 'Basic ' prefix if present
    const normalizedKey = normalizeApiKey(input.apiKey)

    // Log key format for debugging (remove in production)
    console.log('Storing API key:', {
      provider: input.provider,
      original_length: input.apiKey.length,
      normalized_length: normalizedKey.length,
      changed: input.apiKey !== normalizedKey,
    })

    // Encrypt the normalized API key
    const encryptedData = encrypt(normalizedKey)

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
