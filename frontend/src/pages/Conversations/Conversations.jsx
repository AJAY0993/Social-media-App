import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  clearMessageCount,
  getMessageCounts,
  getOnlineUsers,
  getUserId
} from "../../reducer/userSlice"
import User from "../../components/User/User"
import Button from "../../components/Button/Button"
import useConversations from "../../hooks/useConversations"
import Loader from "../../components/Loader/Loader"
import styles from "./Conversations.module.css"

function Conversations() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onlineUsers = useSelector(getOnlineUsers)
  const userId = useSelector(getUserId)
  const messageCounts = useSelector(getMessageCounts)
  const { conversations, isFetcgingConversations } = useConversations()
  const dms = conversations?.map(
    (conversation) =>
      conversation.participants[0]._id === userId
        ? conversation.participants[1] // User 1 is me Then i need User 2 to display on screen
        : conversation.participants[0] // User 1 is not me that i need display  user 1 on screen
  )
  const secondaryCaption = (id) =>
    onlineUsers.includes(id) ? "Online" : "Offline"

  const handleClick = (id) => {
    navigate(id)
    dispatch(clearMessageCount(id))
  }

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
              width="fit"
              onClick={() => handleClick(user._id)}
            >
              Message
              {messageCounts[user._id] > 0 && (
                <span>{messageCounts[user._id]}</span>
              )}
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
