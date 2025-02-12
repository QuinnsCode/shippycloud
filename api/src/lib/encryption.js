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

export const encrypt = (text) => {
  if (!text) {
    throw new EncryptionError('No text provided for encryption')
  }

  if (!process.env.ENCRYPTION_KEY) {
    throw new EncryptionError('ENCRYPTION_KEY environment variable is not set')
  }

  try {
    // Ensure we're working with the raw string, not base64 encoded version
    const iv = randomBytes(IV_LENGTH)
    const salt = randomBytes(SALT_LENGTH)

    const cipher = createCipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv
    )

    // Don't convert to hex, keep as binary data
    let encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()

    return {
      // Convert binary data to hex for storage
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

export const decrypt = ({ encrypted, iv, tag }) => {
  if (!encrypted || !iv || !tag) {
    throw new EncryptionError('Missing required parameters for decryption')
  }

  if (!process.env.ENCRYPTION_KEY) {
    throw new EncryptionError('ENCRYPTION_KEY environment variable is not set')
  }

  try {
    const decipher = createDecipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      Buffer.from(iv, 'hex')
    )

    decipher.setAuthTag(Buffer.from(tag, 'hex'))

    // Convert hex back to binary data
    const encryptedBuffer = Buffer.from(encrypted, 'hex')

    // Decrypt and return as utf8 string
    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]).toString('utf8')

    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    throw new EncryptionError(`Decryption failed: ${error.message}`)
  }
}
