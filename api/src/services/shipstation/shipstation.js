import { ForbiddenError, UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { decrypt } from 'src/lib/encryption'

const validateOrganizationAccess = async (organizationId, context) => {
  if (!context?.currentUser?.id) {
    throw new ForbiddenError('Authentication required')
  }

  const membership = await db.organizationMember.findFirst({
    where: {
      userId: context.currentUser.id,
      organizationId,
      role: {
        in: ['ADMIN', 'OWNER', 'MEMBER'], // Adjust roles as needed
      },
    },
  })

  if (!membership) {
    throw new ForbiddenError('Not authorized to access this organization')
  }
}

export const getShipstation = async (
  { shipstationUrl, organizationId },
  { context }
) => {
  await validateOrganizationAccess(organizationId, context)
  // Find the active Shipstation API key for this organization
  const apiKeyRecord = await db.organizationApiKey.findFirst({
    where: {
      organizationId,
      provider: 'SHIPSTATION',
      isActive: true,
    },
  })

  if (!apiKeyRecord) {
    throw new UserInputError(
      'No active Shipstation API key found for this organization'
    )
  }

  const decryptedKey = decrypt({
    encrypted: apiKeyRecord.encryptedKey,
    iv: apiKeyRecord.keyIv,
    tag: apiKeyRecord.keyTag,
  })

  // Use the decrypted key directly since it's already in base64 format
  const response = await fetch(shipstationUrl, {
    headers: {
      Authorization: `Basic ${decryptedKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Shipstation API error: ${response.statusText}`)
  }

  const json = await response.json()
  const jsonStr = JSON.stringify(json)

  return {
    data: jsonStr,
  }
}
