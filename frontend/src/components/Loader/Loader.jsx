import styles from "./Loader.module.css"
import { createPortal } from "react-dom"
function Loader() {
  return createPortal(
    <div className={`${styles.loader__wrapper} flex j-center a-center`}>
      <div className={styles.loader}></div>
    </div>,
    document.body
  )
}

export default Loader
