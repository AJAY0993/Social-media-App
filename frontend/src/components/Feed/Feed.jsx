import Dropdown from "../Dropdown/Dropdown"
import Post from "../Post/Post"
import Loader from "../Loader/Loader"
import usePosts from "../../hooks/usePosts"
import Button from "../Button/Button"

function Feed() {
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePosts()
  if (isPending) return <Loader />

  return (
    <Dropdown>
      {data &&
        data.pages.map((page) => (
          <>
            {page.posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </>
        ))}
      {isFetchingNextPage && <h3>Loading ...</h3>}
      {hasNextPage && (
        <Button
          type="primary"
          size="small"
          disabled={isFetchingNextPage}
          onClick={fetchNextPage}
        >
          Load More
        </Button>
      )}
    </Dropdown>
  )
}

export default Feed
