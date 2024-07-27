import styles from "./AuthButton.module.css"

function AuthButton({ text, icon }) {
  return (
    <button className={styles.authButton}>
      <img src={icon} />
      {text}
    </button>
  )
}

export default AuthButton
