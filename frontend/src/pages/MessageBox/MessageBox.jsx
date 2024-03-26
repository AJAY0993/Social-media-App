import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { IoArrowBackSharp, IoSendSharp } from "react-icons/io5"

import User from "../../components/User/User"
import Message from "./../../components/Message/Message"
import useBack from "./../../hooks/useBack"
import useSendMessage from "../../hooks/useSendMessage"
import styles from "./MessageBox.module.css"
import useMessages from "../../hooks/useMessages"
import Loader from "../../components/Loader/Loader"
import Button from "../../components/Button/Button"

import useProfile from "../../hooks/useProfile"
import { getOnlineUsers, getUserId } from "../../reducer/userSlice"
import { useSocket } from "../../context/SocketProvider"

function MessageBox() {
  const lastMessageRef = useRef()
  const navigate = useNavigate()
  const { recieverId } = useParams()
  const onlineUsers = useSelector(getOnlineUsers) || []
  const { profile, isProfileLoading } = useProfile()
  const [messages, setMessages] = useState([])
  const userId = useSelector(getUserId)
  const back = useBack()
  const secdondarCaption = onlineUsers.includes(recieverId)
    ? "online"
    : "offline"
  const {
    messages: previousMessages,
    isFetchingMessages: isFetchingPreviousMessages
  } = useMessages()

  useEffect(() => {
    setTimeout(
      () => lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }),
      500
    )
  }, [messages])

  if (isFetchingPreviousMessages || isProfileLoading) return <Loader />
  return (
    <section className={styles.messageBox}>
      <div className={styles.header}>
        <div className={styles.back__btn_wrapper}>
          <Button type="primary" variation="square" onClick={back}>
            <IoArrowBackSharp />
          </Button>
        </div>
        <User
          showBtn={false}
          customClass={styles.user}
          user={profile}
          secondaryCaption={secdondarCaption}
        ></User>
      </div>
      <div className={styles.box}>
        <article className={styles.secondaryHeader + " flex"}>
          <h3>{profile.username}</h3>
          <div className={styles.btn__wrapper}>
            <Button
              type="primary"
              variation="rounded"
              onClick={() => navigate(`/profile/${profile._id}`)}
            >
              Profile
            </Button>
          </div>
        </article>
        <div className={styles.messages__container + " " + "flex"}>
          {previousMessages?.map((message) => (
            <Message
              key={Math.random()}
              ref={lastMessageRef}
              message={{ ...message, sent: message.sender === userId }}
            />
          ))}
        </div>
        <div className={styles.messages__container + " " + "flex"}>
          {messages.map((message) => (
            <Message
              key={Math.random()}
              message={message}
              ref={lastMessageRef}
            />
          ))}
        </div>
        <SendMessageForm setMessages={setMessages} />
      </div>
    </section>
  )
}

function SendMessageForm({ setMessages }) {
  const [message, setMessage] = useState("")
  const { sendMessage } = useSendMessage()
  const { socket } = useSocket()
  const messageSentAudio = new Audio("/audio/sent.mp3")
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessages((s) => [...s, { message, sent: true }])
    sendMessage(message)
    setMessage("")
    messageSentAudio.play()
  }

  useEffect(() => {
    const messageRecievedAudio = new Audio("/audio/notif.mp3")
    socket.on("event:message", (message) => {
      setMessages((messages) => [...messages, message])
      messageRecievedAudio.play()
    })
    return () => socket.off("event:message")
  }, [setMessages, socket])

  return (
    <footer className={styles.form__container}>
      <form className={"flex " + styles.form} action="" onSubmit={handleSubmit}>
        <input
          className="inp inp__secondary"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="primary" variation="rounded" width="fit">
          <IoSendSharp />
        </Button>
      </form>
    </footer>
  )
}
export default MessageBox
