import styles from "./ShowHideIcon.module.css"

function ShowHideIcon({ show, setShow, position }) {
  const handleClick = () => setShow((s) => !s)
  if (!show) {
    return (
      <img
        className={styles.icon}
        style={position}
        src="images/icons/view.png"
        onClick={handleClick}
      />
    )
  }
  return (
    <img
      className={styles.icon}
      style={position}
      src="images/icons/hide.png"
      onClick={handleClick}
    />
  )
}

export default ShowHideIcon
