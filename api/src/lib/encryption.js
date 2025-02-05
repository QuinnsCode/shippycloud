import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const SALT_LENGTH = 64
//set but node is always 16
const TAG_LENGTH = 16
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY // Must be 32 bytes for aes-256

export const encrypt = (text) => {
  const iv = randomBytes(IV_LENGTH)
  const salt = randomBytes(SALT_LENGTH)
  const cipher = createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  )

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag()

  // Return everything needed for decryption
  return {
    encrypted: encrypted,
    iv: iv.toString('hex'),
    salt: salt.toString('hex'),
    tag: tag.toString('hex'),
  }
}

export const decrypt = ({ encrypted, iv, tag }) => {
  const decipher = createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(iv, 'hex')
  )

  decipher.setAuthTag(Buffer.from(tag, 'hex'))

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
