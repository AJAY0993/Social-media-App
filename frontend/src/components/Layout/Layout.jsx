import { Outlet } from "react-router-dom"
import Aside from "./Aside.jsx"
import Header from "./Header.jsx"
import AppNav from "./AppNav.jsx"
import { SocketProvider } from "../../context/SocketProvider.jsx"
import Firebase from "../Firebase/Firebase.jsx"

import styles from "./Layout.module.css"

function Layout() {
  return (
    <SocketProvider>
      <Firebase>
        <div className={`container relative m-auto ${styles.layout}`}>
          <Header />
          <AppNav />
          <Aside />
          <main className={styles.main}>{<Outlet />}</main>
        </div>
      </Firebase>
    </SocketProvider>
  )
}

export default Layout
