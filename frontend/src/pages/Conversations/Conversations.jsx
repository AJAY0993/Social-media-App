import { useNavigate } from "react-router-dom"
import User from "../../components/User/User"
import styles from "./Conversations.module.css"
import { useSelector } from "react-redux"
import { getOnlineUsers, getUserId } from "../../reducer/userSlice"
import useUsers from "../../hooks/useUsers"
import Button from "../../components/Button/Button"

function Conversations() {
  const onlineUsers = useSelector(getOnlineUsers)
  const navigate = useNavigate()
  const userId = useSelector(getUserId)
  const { users, isLoading } = useUsers()
  const dms = users?.filter((user) => user._id !== userId)

  const secondaryCaption = (id) =>
    onlineUsers.includes(id) ? "Online" : "Offline"
  if (isLoading) return "Loading..."
  return (
    <section className={styles.messages}>
      <div className="messages__container">
        {dms.map((user) => (
          <User
            user={user}
            secondaryCaption={secondaryCaption(user._id)}
            customClass={styles.user}
            key={user._id}
          >
            <Button
              type="primary"
              variation="rounded"
              onClick={() => navigate(user._id)}
            >
              Message
            </Button>
          </User>
        ))}
      </div>
    </section>
  )
}

// export async function loader() {
//   const res = await axios("users")
//   console.log(res.data.data.users)
//   return res.data.data.users
// }

export default Conversations
