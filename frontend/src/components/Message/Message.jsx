import styles from "./Message.module.css"
import PropTypes from "prop-types"

Message.propTypes = {
  showImg: PropTypes.bool,
  sent: PropTypes.bool
}

function Message({ showImg = false, message }) {
  const sent = Boolean(message.sent)
  return (
    <div
      className={
        styles.message__container + " " + (sent ? styles.sent : styles.recieved)
      }
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
}

export default Message
