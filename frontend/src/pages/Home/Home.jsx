import Post from "../../components/Post/Post"
import axios from "../../utils/axios"
import CreatePost from "./../../components/CreatePost/CreatePost"
import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../services/postApi"

function Home() {
  // const posts = useLoaderData()
  const {
    isPending,
    error,
    data: posts
  } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"]
  })

  return (
    <>
      <CreatePost />
      {isPending && "Loading..."}
      {posts && posts.map((post) => <Post key={post._id} post={post} />)}
    </>
  )
}

export async function loader() {
  const res = await axios("posts")
  const data = res.data
  return data.data.posts
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const content = formData.get("content")
  const postImage = formData.get("post-picture")
  const tags = formData.get("tags")

  axios("posts", {
    method: "POST",
    data: {
      content,
      caption: "Post caption",
      postImage,
      tags
    }
  })
  return null
}

export default Home
