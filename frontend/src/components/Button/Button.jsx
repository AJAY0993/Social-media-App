import styles from "./Button.module.css"

function Button({
  children,
  onClick,
  type,
  variation,
  disabled = false,
  width,
  size
}) {
  return (
    <button
      className={`${styles.btn} ${styles[type]} ${styles[variation]} ${styles[width]}  ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
