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

function Aside() {
  const dispatch = useDispatch()
  const { users, isLoading: isFetchingUsers } = useUsers()
  const { follow, isFollowing } = useFollow()
  const { unFollow, isUnFollowing } = useUnFollow()
  const following = useSelector(getFollowing)

  const btnType = (id) => {
    return following.includes(id) ? "secondary" : "primary"
  }
  const btnText = (id) => {
    return following.includes(id) ? "Unfollow" : "Follow"
  }
  const btnOnClick = (id) => {
    return following.includes(id)
      ? () => unFollow(id, { onSuccess: () => dispatch(removeFollowing(id)) })
      : () => follow(id, { onSuccess: () => dispatch(addFollowing(id)) })
  }

  if (isFetchingUsers) return <Loader />
  return (
    <aside className={styles.aside}>
      <div className={styles.aside__container}>
        <List
          items={users}
          render={(user) => (
            <User key={user._id} user={user}>
              {
                <Button
                  type={btnType(user._id)}
                  onClick={btnOnClick(user._id)}
                  width={"normal"}
                  disabled={isFollowing || isUnFollowing}
                >
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

export default Aside
