import { createContext, useContext, useState } from "react"
import { HiMiniEllipsisVertical } from "react-icons/hi2"
import styles from "./Dropdown.module.css"

const DropdownContext = createContext()

function Dropdown({ children }) {
  const [openId, setOpenId] = useState("")
  const close = () => setOpenId("")
  const open = setOpenId
  return (
    <DropdownContext.Provider value={{ close, open, openId }}>
      {children}
    </DropdownContext.Provider>
  )
}

function Toggle({ id }) {
  const { close, open, openId } = useContext(DropdownContext)
  const handleClick = () => {
    if (openId === id) return close()
    open(id)
  }

  return (
    <button className={styles.toggle} onClick={handleClick}>
      <HiMiniEllipsisVertical />
    </button>
  )
}

function List({ children, id, left, right, top, bottom }) {
  const style = {
    top,
    right,
    left,
    bottom
  }
  const { openId } = useContext(DropdownContext)
  if (openId !== id) return null
  return (
    <ul className={`${styles.list} flex col absolute sm`} style={style}>
      {children}
    </ul>
  )
}

function Item({ children, onClick }) {
  return (
    <li className={`${styles.item} flex px-1`} onClick={onClick}>
      {children}
    </li>
  )
}

Dropdown.Toggle = Toggle
Dropdown.List = List
Dropdown.Item = Item

export default Dropdown
