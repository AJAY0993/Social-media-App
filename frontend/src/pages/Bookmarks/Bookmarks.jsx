import Dropdown from "../../components/Dropdown/Dropdown"
import List from "../../components/List/List"
import Loader from "../../components/Loader/Loader"
import Post from "../../components/Post/Post"
import useBookmarks from "../../hooks/useBookmarks"

function Bookmarks() {
  const { bookmarks, isFetchingBookmarks } = useBookmarks()
  if (isFetchingBookmarks) return <Loader />
  return (
    <Dropdown>
      <List
        items={bookmarks}
        render={(post) => <Post key={post._id} post={post} />}
        title="Bookmarks"
        failureMessage="No bookmarks"
      />
    </Dropdown>
  )
}

export default Bookmarks
