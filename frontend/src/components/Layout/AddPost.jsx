import { useState } from "react"
import { GrSend } from "react-icons/gr"
import CreatePost from "../CreatePost/CreatePost"
import Modal from "../Modal/Modal"

import styles from "./Layout.module.css"

function AddPost() {
  const [isModalOpen, setIsModalOpen] = useState()

  return (
    <li className={`${styles.navListItem} ${styles.addPostItem} `}>
      <button
        className={styles.addPostBtn}
        onClick={() => setIsModalOpen((s) => !s)}
      >
        <span className={styles.navListItemLinkIcon}>
          <GrSend />
        </span>
        Post
      </button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreatePost />
        </Modal>
      )}
    </li>
  )
}

export default AddPost
