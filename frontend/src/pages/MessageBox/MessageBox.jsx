import { useEffect, useState } from "react"
import { useSocket } from "../../context/SocketProvider"
import User from "../../components/User/User"
import Message from "./../../components/Message/Message"
import { IoArrowBackSharp } from "react-icons/io5"

import useBack from "./../../hooks/useBack"
import useSendMessage from "../../hooks/useSendMessage"
import styles from "./MessageBox.module.css"
import useMessages from "../../hooks/useMessages"
import Loader from "../../components/Loader/Loader"
import { useSelector } from "react-redux"
import { getOnlineUsers, getUserId } from "../../reducer/userSlice"
import { useParams } from "react-router-dom"
import Button from "../../components/Button/Button"

function MessageBox() {
  const { recieverId } = useParams()
  const onlineUsers = useSelector(getOnlineUsers) || ""
  const secdondarCaption = onlineUsers.includes(recieverId)
    ? "online"
    : "offilne"
  const { data, isLoading } = useMessages()
  const [messages, setMessages] = useState([])
  const userId = useSelector(getUserId)
  const back = useBack()

  const previousMessages = data?.previousMessages
  const reciever = data?.reciever

  if (isLoading) return <Loader />
  return (
    <section className={styles.messageBox}>
      <div className={styles.header}>
        <div className={styles.back__btn_wrapper}>
          <button className="btn btn__primary btn--square" onClick={back}>
            <IoArrowBackSharp />
          </button>
        </div>
        <User
          showBtn={false}
          customClass={styles.user}
          user={reciever}
          secondaryCaption={secdondarCaption}
        ></User>
      </div>
      <div className={styles.box}>
        <article className={styles.secondaryHeader + " flex"}>
          <h3>{reciever.username}</h3>
          <div className={styles.btn__wrapper}>
            <Button type="primary" variation="rounded">
              Profile
            </Button>
          </div>
        </article>
        <div className={styles.messages__container + " " + "flex"}>
          {previousMessages?.map((message) => (
            <Message
              key={Math.random()}
              message={{ ...message, sent: message.sender === userId }}
            />
          ))}
        </div>
        <div className={styles.messages__container + " " + "flex"}>
          {messages.map((message) => (
            <Message key={Math.random()} message={message} />
          ))}
        </div>
        <SendMessageForm setMessages={setMessages} />
      </div>
    </section>
  )
}

function SendMessageForm({ setMessages }) {
  const [message, setMessage] = useState("")
  const { sendMessage, isSending } = useSendMessage()
  const { socket } = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessages((s) => [...s, { message, sent: true }])
    sendMessage(message)
    setMessage("")
  }

  useEffect(() => {
    socket.on("event:message", (message) => {
      setMessages((messages) => [...messages, message])
    })
  }, [])

  return (
    <footer className={styles.form__container}>
      <form className={"flex " + styles.form} action="" onSubmit={handleSubmit}>
        <input
          className="inp inp__secondary"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn__primary btn--rounded" disabled={isSending}>
          {isSending ? "Sending" : "send"}
        </button>
      </form>
    </footer>
  )
}
export default MessageBox
