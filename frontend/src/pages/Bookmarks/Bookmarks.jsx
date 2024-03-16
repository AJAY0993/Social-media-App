import List from "../../components/List/List"
import Loader from "../../components/Loader/Loader"
import Post from "../../components/Post/Post"
import useBookmarks from "../../hooks/useBookmarks"

function Bookmarks() {
  const { bookmarks, isFetchingBookmarks } = useBookmarks()
  if (isFetchingBookmarks) return <Loader />
  return (
    <>
      <List
        items={bookmarks}
        render={(post) => <Post key={post._id} post={post} />}
        title="Bookmarks"
        failureMessage="No bookmarks"
      />
    </>
  )
}

export default Bookmarks
