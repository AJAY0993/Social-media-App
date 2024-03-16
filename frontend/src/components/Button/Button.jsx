import styles from "./Button.module.css"

function Button({ children, onClick, type, variation, disabled = false }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]} ${styles[variation] || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
