import { useRef } from "react"
import useSendMessage from "../../hooks/useSendMessage"
import Button from "../Button/Button"
import { IoSendSharp } from "react-icons/io5"
import styles from "./SendMessage.module.css"

function SendMessage({ setMessages }) {
  const messageRef = useRef("")
  const { sendMessage } = useSendMessage()
  const messageSentAudio = new Audio("/audio/sent.mp3")
  const handleSendingMessage = (e) => {
    e.preventDefault()
    if (messageRef.current.value === "") return
    const message = messageRef.current.value
    setMessages((s) => [...s, { message, sent: true }])
    sendMessage(message)
    messageSentAudio.play()
    messageRef.current.value = ""
  }

  return (
    <form className={styles.sendMessageForm} onSubmit={handleSendingMessage}>
      <input
        className="inp inp__secondary"
        type="text"
        ref={messageRef}
      ></input>
      <Button type="primary" variation="rounded" width="fit">
        <IoSendSharp />
      </Button>
    </form>
  )
}

export default SendMessage
