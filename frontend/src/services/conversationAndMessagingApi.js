import axios from "../utils/axios"

export const fetchMyConversations = async () => {
  const res = await axios(`conversations/my`)
  return res.data.data.conversations
}

export const createConversation = async (recieverId) => {
  const res = await axios("conversations", {
    method: "POST",
    recieverId: recieverId
  })
  return res.data.data.conversation
}
