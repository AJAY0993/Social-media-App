import { NavLink } from "react-router-dom"
import { FaCompass } from "react-icons/fa"
import { IoHome } from "react-icons/io5"
import { FaBookBookmark } from "react-icons/fa6"
import { FaMessage } from "react-icons/fa6"
import { FaUser } from "react-icons/fa"
import AddPost from "./AddPost.jsx"

import styles from "./Layout.module.css"
import { useSelector } from "react-redux"
import { getUserId } from "../../reducer/userSlice.js"

function AppNav() {
  const userId = useSelector(getUserId)
  return (
    <nav className={styles.nav}>
      <ul className={`absolute ${styles.navList}`}>
        <NavItem to="/home" text="home" Icon={IoHome} />
        <NavItem to="/explore" text="explore" Icon={FaCompass} />
        <NavItem to="/bookmarks" text="bookmarks" Icon={FaBookBookmark} />
        <NavItem to="/messages" text="messages" Icon={FaMessage} />
        <NavItem to={`profile/${userId}`} text="profile" Icon={FaUser} />
        <AddPost />
      </ul>
    </nav>
  )
}

function NavItem({ to, text, Icon }) {
  const navLinkStyles = ({ isActive }) =>
    `${styles.navListItemLink} ${isActive ? styles.navListItemLinkActive : ""}`
  return (
    <li className={styles.navListItem}>
      <NavLink className={navLinkStyles} to={to}>
        <Icon className={styles.navListItemLinkIcon} />
        <span className={styles.navListItemLinkText}>{text}</span>
      </NavLink>
    </li>
  )
}

export default AppNav
