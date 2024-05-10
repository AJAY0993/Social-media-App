import { forwardRef } from "react"
import styles from "./Message.module.css"

// eslint-disable-next-line react/display-name
const Message = forwardRef(function ({ message, showProfilePic, sender }, ref) {
  const time = message.createdAt
    ? new Date(message.createdAt)?.toLocaleTimeString()
    : ""
  const sent = Boolean(message.sent)
  return (
    <div
      className={
        styles.messageContainer + " " + (sent ? styles.sent : styles.recieved)
      }
      ref={ref}
      data-id={message._id}
      data-user={message.sender}
    >
      {/* <span className={styles.date}>Date</span> */}
      {showProfilePic && (
        <img
          className={styles.messageProfilePic}
          src={sender.profilePic}
          alt="profile-user"
          border="0"
        />
      )}
      <p className={styles.message}>
        {message.message ||
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium,magni."}
        <span className={styles.timeStamp}>{time}</span>
      </p>
    </div>
  )
})
export default Message
