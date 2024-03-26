import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import Button from "../Button/Button"

function Modal({ children, onClose }) {
  const handleClose = (e) => {
    e.stopPropagation()
    onClose()
  }
  return createPortal(
    <>
      <div className={styles.modal__wrapper} onClick={handleClose}>
        <div className={styles.closeBtn}>
          <Button type="primary" variation={"circle"} onClick={handleClose}>
            X
          </Button>
        </div>
      </div>

      <div className={styles.modal}>
        <section className={styles.modalWindow}>{children}</section>
      </div>
    </>,
    document.body
  )
}

export default Modal
