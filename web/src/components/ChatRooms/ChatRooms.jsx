import ChatRoom from 'src/components/ChatRoom/ChatRoom'
const ChatRooms = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-[1fr_100px_64px]">
      <div className="h-[calc(100vh-164px)] border-r-2 border-r-[#615EC4]">
        <ChatRoom
          roomColor="vividYellow"
          chatRoomNumber={1}
          // chatFeed={chatFeed1}
        />
      </div>
      <div className="h-[calc(100vh-164px)] border-r-2 border-r-[#615EC4]">
        <ChatRoom
          roomColor="orchid"
          chatRoomNumber={2}
          // chatFeed={chatFeed2}
        />
      </div>
      <div className="h-[calc(100vh-164px)] border-r-2 border-r-[#615EC4]">
        <ChatRoom
          roomColor="cadetBlue"
          chatRoomNumber={3}
          // chatFeed={chatFeed3}
        />
      </div>
      <div className="h-[calc(100vh-164px)]">
        <ChatRoom
          roomColor="coral"
          chatRoomNumber={4}
          // chatFeed={chatFeed4}
        />
      </div>
    </div>
  )
}

export default ChatRooms
