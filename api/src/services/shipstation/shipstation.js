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
    },
  })

  if (!apiKeyRecord) {
    throw new UserInputError(
      'No active Shipstation API key found for this organization'
    )
  }

  try {
    // Add this simple debug logging
    console.log('API Key record:', {
      orgId: organizationId,
      found: Boolean(apiKeyRecord),
      keyIdLastFour: apiKeyRecord?.id.slice(-4) || 'none',
      // Add these to see the encrypted components
      ivLength: apiKeyRecord?.keyIv?.length,
      tagLength: apiKeyRecord?.keyTag?.length,
      encryptedLength: apiKeyRecord?.encryptedKey?.length,
    })
    // Decrypt the key
    const decryptedKey = decrypt({
      encrypted: apiKeyRecord.encryptedKey,
      iv: apiKeyRecord.keyIv,
      tag: apiKeyRecord.keyTag,
    })

    // Always ensure the key is properly formatted for the Authorization header
    // First make sure we DON'T have "Basic " prefix on the stored key
    const cleanKey = decryptedKey.startsWith('Basic ')
      ? decryptedKey.substring(6).trim()
      : decryptedKey.trim()

    // Then add the "Basic " prefix for the header
    const authHeader = `Basic ${cleanKey}`

    // For debugging
    console.log('Using auth header:', {
      prefix: authHeader.substring(0, 15) + '...',
      length: authHeader.length,
    })

    let response = null

    try {
      response = await fetch(shipstationUrl, {
        headers: {
          Authorization: authHeader,
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
  } catch (error) {
    console.error('Error processing API key:', error)
    throw error
  }
}
