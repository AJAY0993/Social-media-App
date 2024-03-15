import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom"
import User from "../User/User"
import styles from "./Layout.module.css"
import {
  IoHomeOutline,
  IoSearchOutline,
  IoBookmarkOutline
} from "react-icons/io5"
import { LuMessagesSquare } from "react-icons/lu"
import { FaRegCircleUser } from "react-icons/fa6"
import Loader from "../Loader/Loader"
import ProtectRoute from "../ProtectRoute/ProtectRoute"
import { useSelector } from "react-redux"
import { getFollowing, getUserId } from "../../reducer/userSlice"
import useUsers from "../../hooks/useUsers"
import useFollow from "../../hooks/useFollow"
import useUnFollow from "../../hooks/useUnFollow"
import Button from "../Button/Button"
import { useState } from "react"
import CreatePost from "../CreatePost/CreatePost"
import Modal from "../Modal/Modal"
import List from "../List/List"

function Layout() {
  return (
    <ProtectRoute>
      <div className="container">
        <header className={styles.header}>
          <div className={"container " + styles.ping}></div>
        </header>
        <SideNav />
        <main className={styles.main}>{<Outlet />}</main>
        <Aside />
      </div>
    </ProtectRoute>
  )
}

function SideNav() {
  const userId = useSelector(getUserId)
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__list_item}>
          <NavLink className={styles.nav__list_link} to="/home">
            <IoHomeOutline /> <span>Home</span>
          </NavLink>
        </li>
        <li className={styles.nav__list_item}>
          <NavLink className={styles.nav__list_link} to="/">
            <IoSearchOutline /> <span>Explore</span>
          </NavLink>
        </li>
        <li className={styles.nav__list_item}>
          <NavLink className={styles.nav__list_link} to="/">
            <IoBookmarkOutline /> <span>Bookmarks</span>
          </NavLink>
        </li>
        <li className={styles.nav__list_item}>
          <NavLink className={styles.nav__list_link} to="/messages">
            <LuMessagesSquare />
            <span>Messages</span>
          </NavLink>
        </li>
        <li className={styles.nav__list_item}>
          <NavLink className={styles.nav__list_link} to={`/profile/${userId}`}>
            <FaRegCircleUser /> <span>Profile</span>
          </NavLink>
        </li>
        <li className={styles.nav__list_item}>
          <AddPost />
        </li>
      </ul>
    </nav>
  )
}

function Aside() {
  const navigate = useNavigate()
  const { users, isLoading: isFetchingUsers } = useUsers()
  const { follow, isFollowing } = useFollow()
  const { unFollow, isUnFollowing } = useUnFollow()
  const following = useSelector(getFollowing)

  const handleClick = (userId) => navigate(`/profile/${userId}`)

  const btnType = (id) => {
    return following.includes(id) ? "secondary" : "primary"
  }
  const btnText = (id) => {
    return following.includes(id) ? "Unfollow" : "Follow"
  }
  const btnOnClick = (id) => {
    return following.includes(id) ? () => unFollow(id) : () => follow(id)
  }

  if (isFollowing || isUnFollowing || isFetchingUsers) return "Loading..."
  return (
    <aside className={styles.aside}>
      <div className={styles.aside__container}>
        <List
          items={users}
          render={(user) => (
            <User
              key={user._id}
              user={user}
              onClick={() => handleClick(user._id)}
            >
              {
                <Button type={btnType(user._id)} onClick={btnOnClick(user._id)}>
                  {btnText(user._id)}
                </Button>
              }
            </User>
          )}
          title={"Who to follow"}
          failureMessage={"Nothing to see here"}
        />
      </div>
    </aside>
  )
}

function AddPost() {
  const [isModalOpen, setIsModalOpen] = useState()

  return (
    <>
      <Button
        className={"btn  " + styles.btn}
        variation="rounded"
        type="primary"
        onClick={() => setIsModalOpen((s) => !s)}
      >
        Post
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreatePost />
        </Modal>
      )}
    </>
  )
}
export default Layout
