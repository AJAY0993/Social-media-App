import { useEffect, useRef, useState } from "react"

import SendMessage from "../../components/SendMessage/SendMessage"
import MessagesContainer from "../../components/MessagesContainer/MessagesContainer"

import styles from "./PageForEachChat.module.css"
import User from "../../components/User/User"
import useProfile from "../../hooks/useProfile"
import Loader from "../../components/Loader/Loader"
import CallButon from "../../components/CallButton/CallButon"
import { getOnlineUsers } from "../../reducer/userSlice"
import { useSelector } from "react-redux"
import useBack from "../../hooks/useBack"
import { useParams } from "react-router-dom"
import Button from "../../components/Button/Button"
import { IoArrowBackSharp } from "react-icons/io5"

function PageForEachChat() {
  const lastMessageRef = useRef()
  const { recieverId } = useParams()
  const { profile, isProfileLoading } = useProfile()
  const [messages, setMessages] = useState([])
  const onlineUsers = useSelector(getOnlineUsers) || []
  const back = useBack()
  const isOnline = onlineUsers.includes(recieverId)

  useEffect(() => {
    setTimeout(
      () => lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }),
      500
    )
  }, [messages])
  if (isProfileLoading) return <Loader />
  return (
    <section className={styles.pageForEachChat}>
      <div className={styles.header}>
        <Button type="primary" variation="square" onClick={back}>
          <IoArrowBackSharp />
        </Button>
        <User
          customClass={styles.user}
          user={profile}
          secondaryCaption={isOnline ? "Online" : "Offline"}
        >
          <CallButon userId={recieverId} />
        </User>
      </div>
      <MessagesContainer messages={messages} setMessages={setMessages} />
      <SendMessage setMessages={setMessages} />
    </section>
  )
}

export default PageForEachChat
