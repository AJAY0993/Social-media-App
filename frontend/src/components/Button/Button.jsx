import styles from "./Button.module.css"

function Button({ children, onClick, type, variation }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]} ${styles[variation] || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
