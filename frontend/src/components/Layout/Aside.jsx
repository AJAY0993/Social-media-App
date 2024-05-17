import { useDispatch, useSelector } from "react-redux"
import useUsers from "../../hooks/useUsers"
import useFollow from "../../hooks/useFollow"
import useUnFollow from "../../hooks/useUnFollow"
import {
  addFollowing,
  getFollowing,
  removeFollowing
} from "../../reducer/userSlice"
import Loader from "../Loader/Loader"
import List from "../List/List"
import User from "../User/User"
import Button from "../Button/Button"

import styles from "./Layout.module.css"
import { useState } from "react"

function Aside() {
  const { users, isLoading: isFetchingUsers } = useUsers()

  if (isFetchingUsers) return <Loader />
  return (
    <aside className={styles.aside}>
      <div className={styles.aside__container}>
        <List
          items={users}
          render={(user) => (
            <User key={user._id} user={user}>
              <FollowUnfollow userId={user._id} />
            </User>
          )}
          title={"Who to follow"}
          failureMessage={"Nothing to see here"}
        />
      </div>
    </aside>
  )
}

function FollowUnfollow({ userId }) {
  const [state, setState] = useState({
    type: "primary",
    text: "Following"
  })
  const dispatch = useDispatch()
  const { follow, isFollowing } = useFollow()
  const { unFollow, isUnFollowing } = useUnFollow()
  const following = useSelector(getFollowing)
  const isFollowingAlready = following.includes(userId)

  const handleMouseLeave = () => {
    setState((_) => ({
      variation: "",
      type: "secondary",
      text: "Following"
    }))
  }
  const handleMouseEnter = () => {
    setState((s) => ({
      variation: "danger",
      text: "Unfollow"
    }))
  }

  const handleFollow = () =>
    follow(userId, { onSuccess: () => dispatch(addFollowing(userId)) })

  const handleUnfollow = () =>
    unFollow(userId, { onSuccess: () => dispatch(removeFollowing(userId)) })

  if (!isFollowingAlready)
    return (
      <Button
        type="primary"
        onClick={handleFollow}
        width="normal"
        disabled={isFollowing || isUnFollowing}
      >
        Follow
      </Button>
    )

  return (
    <Button
      type={state.type}
      onClick={handleUnfollow}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variation={state.variation}
      width="normal"
      disabled={isFollowing || isUnFollowing}
    >
      {state.text}
    </Button>
  )
}

export default Aside
