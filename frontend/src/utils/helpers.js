import { formatDistanceToNow } from "date-fns"

export const extractTags = (text) => {
  const tags = []
  text.split(" ").filter((word) => {
    if (word.startsWith("#")) {
      tags.push(word.slice(1))
      return false
    }
    return true
  })
  return tags
}

export const formatDate = (date) => `${formatDistanceToNow(date)} ago`
