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
      <div>
        <span
          className={styles.themeToggler}
          role="button"
          onClick={(e) => {
            e.preventDefault()
            const html = document.querySelector("html")
            if (html.className === "dark") {
              html.className = "light"
              e.target.innerText = "🌛"
            } else {
              html.className = "dark"
              e.target.innerText = "☀️"
            }
          }}
        >
          🌛
        </span>
      </div>
    </header>
  )
}

export default Header
