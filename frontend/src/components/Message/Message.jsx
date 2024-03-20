import { forwardRef } from "react"
import styles from "./Message.module.css"

// eslint-disable-next-line react/display-name
const Message = forwardRef(function ({ showImg = false, message }, ref) {
  const sent = Boolean(message.sent)
  return (
    <div
      className={
        styles.message__container + " " + (sent ? styles.sent : styles.recieved)
      }
      ref={ref}
    >
      {showImg && (
        <img
          className="btn--circle"
          src="https://i.ibb.co/mBXRT6g/profile-user.png"
          alt="profile-user"
          border="0"
        />
      )}
      <p className={styles.message}>
        {message.message ||
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium,magni."}
      </p>
    </div>
  )
})
export default Message
