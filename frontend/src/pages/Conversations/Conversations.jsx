import { useNavigate } from "react-router-dom"
import User from "../../components/User/User"
import styles from "./Conversations.module.css"
import { useSelector } from "react-redux"
import { getOnlineUsers, getUserId } from "../../reducer/userSlice"
import Button from "../../components/Button/Button"
import useConversations from "../../hooks/useConversations"
import Loader from "../../components/Loader/Loader"

function Conversations() {
  const onlineUsers = useSelector(getOnlineUsers)
  const userId = useSelector(getUserId)
  const navigate = useNavigate()
  const { conversations, isFetcgingConversations } = useConversations()
  const dms = conversations?.map(
    (conversation) =>
      conversation.participants[0]._id === userId
        ? conversation.participants[1] // User 1 is me Then i need User 2 to display on screen
        : conversation.participants[0] // User 1 is not me that i need display  user 1 on screen
  )
  const secondaryCaption = (id) =>
    onlineUsers.includes(id) ? "Online" : "Offline"
  if (isFetcgingConversations) return <Loader />
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
