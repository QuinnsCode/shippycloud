import React, { useState, useEffect } from 'react'

import { useSubscription, useMutation, gql } from '@redwoodjs/web'

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription ListenForNewMessages($roomId: ID!) {
    newMessage(roomId: $roomId) {
      body
      from
    }
  }
`

const SEND_MESSAGE = gql`
  mutation SendMessageMutation($input: SendMessageInput!) {
    sendMessage(input: $input) {
      body
      from
    }
  }
`

const Avatar = ({ name, color }) => {
  return (
    <div
      className={`h-10 w-10 rounded-full flex items-center justify-center
        text-white font-bold bg-${color}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

const ChatRoomMessage = ({ chatMessage }) => {
  return (
    <li className="flex items-center gap-x-4 border-t-1 border-t-[#504EB2] px-6 py-4">
      <Avatar name={chatMessage.user.name} color={chatMessage.user.color} />
      <div className="leading-tight">
        <strong>{chatMessage.user.name}</strong>
        <div>{chatMessage.message}</div>
      </div>
    </li>
  )
}

const ChatRoom = ({ chatRoomNumber, roomColor }) => {
  const [chatFeed, setChatFeed] = useState([])
  const [isRoomActive, setIsRoomActive] = useState(false)
  const [from, setFrom] = useState('')
  const [body, setBody] = useState('')

  // Send message mutation
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      console.log('Message sent:', data)
    },
    onError: (error) => {
      console.error('Error sending message:', error)
    },
  })

  // Subscription
  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { roomId: chatRoomNumber },
    onData: ({ data }) => {
      console.log('Subscription received:', data)
      const message = data?.data?.newMessage

      if (message) {
        const newMessage = {
          id: chatFeed.length,
          message: message.body,
          user: {
            name: message.from,
            color: roomColor,
          },
        }

        setChatFeed((prevChatFeed) => [...prevChatFeed, newMessage])
        setIsRoomActive(true)
      }
    },
  })

  // Scroll effects
  useEffect(() => {
    if (isRoomActive) {
      const timeoutId = setTimeout(() => {
        setIsRoomActive(false)
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [isRoomActive])

  useEffect(() => {
    const scrollAnchor = document.getElementById(
      `scroll-anchor-${chatRoomNumber}`
    )
    scrollAnchor?.scrollIntoView({ behavior: 'smooth' })
    console.log(chatFeed)
  }, [chatFeed, chatRoomNumber])

  // Send message handler
  function handleSendMessage() {
    if (from && body) {
      sendMessage({
        variables: {
          input: {
            roomId: chatRoomNumber.toString(),
            from,
            body,
          },
        },
      })

      // Clear input fields
      setFrom('')
      setBody('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex flex-col flex-grow ${
          !isRoomActive ? 'bg-midnightBlue' : 'bg-darkSlateBlue'
        } transition-background-color text-white duration-500`}
      >
        <div className="flex items-center gap-x-4 border-b-1 border-b-[#7F7CDA] p-5">
          <div
            className={`center h-12 w-12 rounded-full font-bold text-darkSlateBlue bg-${roomColor} text-xl`}
          >
            {chatRoomNumber}
          </div>
          <h2 className="font-bold">Room {chatRoomNumber}</h2>
        </div>

        <div
          className="flex-grow overflow-y-auto"
          id={`chat-feed-${chatRoomNumber}`}
        >
          {chatFeed.map((chatMessage) => {
            return (
              <ChatRoomMessage key={chatMessage.id} chatMessage={chatMessage} />
            )
          })}
          <div id={`scroll-anchor-${chatRoomNumber}`} />
        </div>

        <div className="p-4 bg-gray-800 flex space-x-2">
          <input
            type="text"
            placeholder="Your Name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-grow p-2 bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-grow p-2 bg-gray-700 text-white"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
