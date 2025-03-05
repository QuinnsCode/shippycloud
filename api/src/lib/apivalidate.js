// api/src/lib/providerValidation.js
import fetch from 'node-fetch'

/**
 * Validates an API key based on the provider
 * @param {string} provider - Provider identifier (e.g., 'SHIPSTATION', 'SHOPIFY')
 * @param {string} apiKey - API key to validate
 * @returns {Promise<boolean>} True if key is valid
 * @throws {Error} If validation fails or provider not supported
 */
export const validateApiKey = async (provider, apiKey) => {
  switch (provider) {
    case 'SHIPSTATION':
      return validateShipstationApiKey(apiKey)
    case 'SHOPIFY':
      return validateShopifyApiKey(apiKey)
    case 'AMAZON':
      return validateAmazonApiKey(apiKey)
    default:
      // For providers without specific validation, return true
      console.log(`No validation implemented for provider: ${provider}`)
      return true
  }
}
/**
 * Validates a ShipStation API key by making a test request
 * @param {string} apiKey - Base64 encoded ShipStation API key
 * @returns {Promise<boolean>} True if key is valid
 * @throws {Error} If validation fails
 */
export const validateShipstationApiKey = async (apiKey) => {
  try {
    const response = await fetch(
      'https://ssapi.shipstation.com/orders?pageSize=1',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Invalid ShipStation API credentials. Please check your API key and secret.'
        )
      } else {
        const errorData = await response.text()
        throw new Error(
          `ShipStation API test failed: ${response.status} ${errorData}`
        )
      }
    }

    // Additional validation to ensure response is in expected format
    const data = await response.json()
    if (!data || !data?.orders) {
      throw new Error('ShipStation API returned unexpected response format')
    }

    return true
  } catch (error) {
    console.error('ShipStation API key validation error:', error)
    throw new Error(`Failed to validate ShipStation API key: ${error.message}`)
  }
}

/**
 * Validates a Shopify API key by making a test request
 * @param {string} apiKey - Shopify API key
 * @returns {Promise<boolean>} True if key is valid
 * @throws {Error} If validation fails
 */
export const validateShopifyApiKey = async (apiKey) => {
  try {
    // Implementation for Shopify API validation
    // This is a placeholder - implement actual Shopify validation
    return true
  } catch (error) {
    throw new Error(`Failed to validate Shopify API key: ${error.message}`)
  }
}

/**
 * Validates an Amazon API key by making a test request
 * @param {string} apiKey - Amazon API key
 * @returns {Promise<boolean>} True if key is valid
 * @throws {Error} If validation fails
 */
export const validateAmazonApiKey = async (apiKey) => {
  try {
    // Implementation for Amazon API validation
    // This is a placeholder - implement actual Amazon validation
    return true
  } catch (error) {
    throw new Error(`Failed to validate Amazon API key: ${error.message}`)
  }
}
