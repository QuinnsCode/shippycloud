import { logger } from 'src/lib/logger'

export const room = ({ id }) => [id]

export const sendMessage = async ({ input }, { context }) => {
  logger.debug({ input }, 'sending message ....')

  console.log('Sending message:', input)
  const { roomId, from, body } = input

  try {
    context.pubSub.publish('newMessage', roomId, { from, body })
    console.log('Message published')
  } catch (error) {
    console.error('Error publishing message:', error)
  }

  return input
}
