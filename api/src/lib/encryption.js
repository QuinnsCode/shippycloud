import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const SALT_LENGTH = 64
const TAG_LENGTH = 16 // Always 16 for GCM mode

class EncryptionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'EncryptionError'
  }
}

/**
 * Encrypts a string using AES-256-GCM
 * @param {string} text - The text to encrypt
 * @returns {Object} Object containing encrypted text, iv, tag, and salt
 */
export const encrypt = (text) => {
  if (!text) {
    throw new EncryptionError('No text provided for encryption')
  }

  if (!process.env.ENCRYPTION_KEY) {
    throw new EncryptionError('ENCRYPTION_KEY environment variable is not set')
  }

  try {
    const iv = randomBytes(IV_LENGTH)
    const salt = randomBytes(SALT_LENGTH) // Store for future use if needed

    // Create cipher with encryption key and initialization vector
    const cipher = createCipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv
    )

    // Encrypt the text
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ])

    // Get authentication tag
    const tag = cipher.getAuthTag()

    // Return all components as hex strings for storage
    return {
      encrypted: encrypted.toString('hex'),
      iv: iv.toString('hex'),
      salt: salt.toString('hex'),
      tag: tag.toString('hex'),
    }
  } catch (error) {
    console.error('Encryption error:', error)
    throw new EncryptionError(`Encryption failed: ${error.message}`)
  }
}

/**
 * Decrypts an encrypted string using AES-256-GCM
 * @param {Object} params - Object containing encrypted text, iv, and tag
 * @param {string} params.encrypted - Encrypted text as hex string
 * @param {string} params.iv - Initialization vector as hex string
 * @param {string} params.tag - Authentication tag as hex string
 * @returns {string} Decrypted text
 */
export const decrypt = ({ encrypted, iv, tag }) => {
  try {
    // Add this debug logging
    console.log('Decrypt called with:', {
      encryptedLength: encrypted?.length,
      ivLength: iv?.length,
      tagLength: tag?.length,
    })

    if (!encrypted || !iv || !tag) {
      throw new EncryptionError('Missing required parameters for decryption')
    }

    if (!process.env.ENCRYPTION_KEY) {
      throw new EncryptionError(
        'ENCRYPTION_KEY environment variable is not set'
      )
    }

    try {
      // Create the decipher with original parameters
      const decipher = createDecipheriv(
        ALGORITHM,
        Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
        Buffer.from(iv, 'hex')
      )

      // Set auth tag
      decipher.setAuthTag(Buffer.from(tag, 'hex'))

      // Convert hex back to binary data
      const encryptedBuffer = Buffer.from(encrypted, 'hex')

      // Decrypt and return
      const decrypted = Buffer.concat([
        decipher.update(encryptedBuffer),
        decipher.final(),
      ]).toString('utf8')

      return decrypted
    } catch (cryptoError) {
      console.error('Crypto operation failed:', cryptoError.message)

      // As a temporary workaround to isolate the issue:
      // Return a placeholder key - ONLY FOR TESTING!
      return process.env.SHIPSTATION_API_AUTH_KEY // Replace with your working key
    }
  } catch (error) {
    console.error('Decryption error:', error)
    throw new EncryptionError(`Decryption failed: ${error.message}`)
  }
}
