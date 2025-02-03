import gql from 'graphql-tag'

import { logger } from 'src/lib/logger'

/**
 * To test this NewMessage subscription, run the following in one GraphQL Playground to subscribe:
 *
 * subscription ListenForNewMessagesInRoom {
 *   newMessage(roomId: "1") {
 *     body
 *     from
 *   }
 * }
 *
 *
 * And run the following in another GraphQL Playground to publish and send a message to the room:
 *
 * mutation SendMessageToRoom {
 *   sendMessage(input: {roomId: "1", from: "hello", body: "bob"}) {
 *     body
 *     from
 *   }
 * }
 */
export const schema = gql`
  type Subscription {
    newMessage(roomId: ID!): Message! @requireAuth
  }
`

const newMessage = {
  newMessage: {
    subscribe: (_, { roomId }, { pubSub }) => {
      logger.debug({ roomId }, 'newMessage subscription')
      console.log('Subscribing to room:', roomId)
      return pubSub.subscribe('newMessage', roomId)
    },
    resolve: (payload) => {
      console.log('Resolve called with payload:', payload)
      logger.debug({ payload }, 'newMessage subscription resolve')

      return payload
    },
  },
}

export default newMessage
