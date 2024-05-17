import styles from "./Button.module.css"

function Button({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
