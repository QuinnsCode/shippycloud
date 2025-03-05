// import { btoa } from 'src/lib/crypto'
/**
 * Generic Base64 encoding function
 * @param {string} str - String to encode in Base64
 * @returns {string} Base64 encoded string
 */
export const encodeBase64 = (str) => {
  return btoa(str)
}

/**
 * Encodes ShipStation API credentials into Base64 format for Basic Auth
 * @param {string} apiKey - ShipStation API key
 * @param {string} apiSecret - ShipStation API secret
 * @returns {string} Base64 encoded credentials ready for use
 */
export const encodeShipstationApiKey = (apiKey, apiSecret) => {
  return encodeBase64(`${apiKey}:${apiSecret}`)
}

/**
 * Processes an API key to ensure it doesn't include the "Basic " prefix
 * @param {string} key - API key (potentially with "Basic " prefix)
 * @returns {string} API key without the "Basic " prefix
 */
export const processApiKey = (key) => {
  if (key && typeof key === 'string' && key.startsWith('Basic ')) {
    return key.substring(6) // Remove the "Basic " prefix
  }
  return key
}

/**
 * Formats a Base64 encoded API key for use in Authorization header
 * @param {string} encodedKey - Base64 encoded API key (without "Basic " prefix)
 * @returns {string} Properly formatted Authorization header value
 */
export const formatAuthHeader = (encodedKey) => {
  return `Basic ${encodedKey}`
}
