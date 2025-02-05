// api/src/services/organizationApiKeys/organizationApiKeys.js
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { encrypt, decrypt } from 'src/lib/encryption'

const validateOrganizationAccess = async (organizationId, context) => {
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
  await validateOrganizationAccess(input.organizationId, context)

  const encryptedData = encrypt(input.apiKey)

  return db.organizationApiKey.create({
    data: {
      organizationId: input.organizationId,
      provider: input.provider,
      label: input.label,
      encryptedKey: encryptedData.encrypted,
      keyIv: encryptedData.iv,
      keyTag: encryptedData.tag,
      keySalt: encryptedData.salt,
      createdBy: context.currentUser.id,
    },
  })
}

export const getOrganizationApiKey = async (
  { organizationId, provider },
  { context }
) => {
  // For using API keys, we can be more permissive - any org member can use them
  const membership = await db.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: context.currentUser.id,
        organizationId,
      },
    },
  })

  if (!membership) {
    throw new ForbiddenError('Not authorized to access API keys')
  }

  const apiKey = await db.organizationApiKey.findUnique({
    where: {
      organizationId_provider: {
        organizationId,
        provider,
      },
    },
  })

  if (!apiKey || !apiKey.isActive) {
    return null
  }

  // Update lastUsedAt
  await db.organizationApiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  })

  return decrypt({
    encrypted: apiKey.encryptedKey,
    iv: apiKey.keyIv,
    tag: apiKey.keyTag,
  })
}

export const deleteOrganizationApiKey = async ({ id }, { context }) => {
  const apiKey = await db.organizationApiKey.findUnique({
    where: { id },
  })

  await validateOrganizationAccess(apiKey.organizationId, context)

  return db.organizationApiKey.delete({
    where: { id },
  })
}

// api/src/services/organizationApiKeys/organizationApiKeys.js

export const rotateOrganizationApiKey = async (
  { organizationId, provider, newApiKey },
  { context }
) => {
  // Start a database transaction to ensure atomicity
  return await db.$transaction(async (tx) => {
    // 1. Validate access and get current key
    const membership = await tx.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: context.currentUser.id,
          organizationId,
        },
      },
    })

    if (!membership || !['ADMIN', 'OWNER'].includes(membership.role)) {
      throw new ForbiddenError('Not authorized to rotate API keys')
    }

    // 2. Get the current active key
    const currentKey = await tx.organizationApiKey.findUnique({
      where: {
        organizationId_provider: {
          organizationId,
          provider,
        },
      },
    })

    if (!currentKey) {
      throw new Error(`No existing ${provider} API key found for organization`)
    }

    // 3. Validate the new key by making a test API call
    try {
      await validateNewApiKey(provider, newApiKey)
    } catch (error) {
      throw new Error(`New API key validation failed: ${error.message}`)
    }

    // 4. Encrypt the new key
    const encryptedData = encrypt(newApiKey)

    // 5. Create rotation record
    const keyRotation = await tx.apiKeyRotation.create({
      data: {
        organizationApiKeyId: currentKey.id,
        rotatedBy: context.currentUser.id,
        reason: 'Scheduled rotation', // Could be passed as parameter
        previousKeyHash: createKeyHash(currentKey.encryptedKey), // Store hash for audit
      },
    })

    // 6. Update the existing key record
    const updatedKey = await tx.organizationApiKey.update({
      where: { id: currentKey.id },
      data: {
        encryptedKey: encryptedData.encrypted,
        keyIv: encryptedData.iv,
        keyTag: encryptedData.tag,
        keySalt: encryptedData.salt,
        updatedAt: new Date(),
        lastRotatedAt: new Date(),
        rotationHistory: {
          connect: { id: keyRotation.id },
        },
      },
    })

    // 7. Create audit log entry
    await tx.auditLog.create({
      data: {
        action: 'API_KEY_ROTATION',
        organizationId,
        performedBy: context.currentUser.id,
        resourceType: 'API_KEY',
        resourceId: updatedKey.id,
        metadata: {
          provider,
          rotationId: keyRotation.id,
        },
      },
    })

    return updatedKey
  })
}

// Helper function to validate new API key before rotation
async function validateNewApiKey(provider, apiKey) {
  switch (provider) {
    case 'SHIPSTATION':
      // Make a test call to ShipStation API
      const response = await fetch('https://ssapi.shipstation.com/carriers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
      })

      if (!response.ok) {
        throw new Error('Invalid ShipStation API key')
      }
      break

    // Add cases for other providers
    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}

// Helper function to create a hash of the key for audit purposes
function createKeyHash(encryptedKey) {
  return crypto.createHash('sha256').update(encryptedKey).digest('hex')
}
