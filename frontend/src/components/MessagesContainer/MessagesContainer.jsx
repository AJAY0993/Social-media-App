import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useSocket } from "../../context/SocketProvider"
import useMessages from "./../../hooks/useMessages"
import Message from "../Message/Message"
import styles from "./MessagesContainer.module.css"
import { getUserId } from "../../reducer/userSlice"

function MessagesContainer({ setMessages, messages }) {
  const lastMessageRef = useRef()
  const { socket } = useSocket()
  const userId = useSelector(getUserId)

  const {
    messages: previousMessages,
    isFetchingMessages: isFetchingPreviousMessages
  } = useMessages()

  useEffect(() => {
    const messageRecievedAudio = new Audio("/audio/notif.mp3")
    socket.on("event:message", (message) => {
      setMessages((messages) => [...messages, message])
      messageRecievedAudio.play()
    })
    return () => socket.off("event:message")
  }, [setMessages, socket])

  useEffect(() => {
    setTimeout(
      () => lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }),
      500
    )
  }, [messages])

  if (isFetchingPreviousMessages) return "Loading"
  return (
    <div className={styles.messagesContainer}>
      {previousMessages?.map((message, i) => (
        <Message
          key={Math.random()}
          ref={lastMessageRef}
          message={{ ...message, sent: message.sender._id === userId }}
          sender={message.sender}
          showProfilePic={
            previousMessages[i - 1]?.sender._id !== message.sender._id
          }
        />
      ))}

      {messages.map((message, i) => (
        <Message
          key={Math.random()}
          message={message}
          ref={lastMessageRef}
          sender={message.sender}
          showProfilePic={messages[i - 1]?.sender._id !== message.sender._id}
        />
      ))}
    </div>
  )
}

export default MessagesContainer
