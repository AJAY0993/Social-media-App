import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import Button from "../Button/Button"

function Modal({ children, onClose }) {
  return createPortal(
    <>
      <div className={styles.modal__wrapper}></div>

      <div className={styles.modal}>
        <div className={styles.closeBtn}>
          <Button type="primary" variation={"circle"} onClick={onClose}>
            X
          </Button>
        </div>
        <section className={styles.modalWindow}>{children}</section>
      </div>
    </>,
    document.body
  )
}

export default Modal
