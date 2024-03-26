import CreatePost from "./../../components/CreatePost/CreatePost"
import Feed from "../../components/Feed/Feed"

function Home() {
  return (
    <>
      <CreatePost />
      <Feed />
    </>
  )
}

// export async function loader() {
//   const res = await axios("posts")
//   const data = res.data
//   return data.data.posts
// }

// export async function action({ request, params }) {
//   const formData = await request.formData()
//   const content = formData.get("content")
//   const postImage = formData.get("post-picture")
//   const tags = formData.get("tags")

//   axios("posts", {
//     method: "POST",
//     data: {
//       content,
//       caption: "Post caption",
//       postImage,
//       tags
//     }
//   })
//   return null
// }

export default Home
