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
        in: ['ADMIN', 'OWNER', 'MEMBER'],
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
  console.log('getShipstation1 ' + organizationId + ' - ' + shipstationUrl)

  await validateOrganizationAccess(organizationId, context)

  console.log('getShipstation2 ' + organizationId + ' - ' + shipstationUrl)
  // Find the active Shipstation API key for this organization
  const apiKeyRecord = await db.organizationApiKey.findFirst({
    where: {
      organization: {
        id: organizationId,
      },
      provider: 'SHIPSTATION',
      // Optionally include isActive: true, if it's needed in your logic
      // isActive: true,
    },
  })

  if (!apiKeyRecord) {
    console.log('LENGTH: ' + apiKeyRecord?.length)

    console.log('getShipstation')
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
  let response = null
  try {
    response = await fetch(shipstationUrl, {
      headers: {
        Authorization: `Basic ${decryptedKey}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching Shipstation data:', error)
    throw new Error(`Shipstation API error: ${error.message}`)
  }

  if (!response.ok) {
    throw new Error(`Shipstation API error: ${response.statusText}`)
  }

  const json = await response.json()
  const jsonStr = JSON.stringify(json)

  return {
    data: jsonStr,
  }
}
