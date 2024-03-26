import { useQuery } from "@tanstack/react-query"
import Dropdown from "../Dropdown/Dropdown"
import Post from "../Post/Post"
import Loader from "../Loader/Loader"
import { fetchPosts } from "../../services/postApi"

function Feed() {
  const {
    isPending,

    data: posts
  } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"]
  })

  if (isPending) return <Loader />
  return (
    <Dropdown>
      {posts && posts.map((post) => <Post key={post._id} post={post} />)}
    </Dropdown>
  )
}

export default Feed
