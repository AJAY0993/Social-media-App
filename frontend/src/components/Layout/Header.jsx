import { NavLink } from "react-router-dom"

import styles from "./Layout.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink className={styles.logoLink}>
          <img className={styles.logoImage} src="images/logo.png" />
          <span className={styles.logoText}>Social hub</span>
        </NavLink>
      </div>
    </header>
  )
}

export default Header
