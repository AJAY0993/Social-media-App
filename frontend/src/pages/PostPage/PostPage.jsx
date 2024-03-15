import Comment from "../../components/Comment/Comment"
import Layout from "../../components/Layout/Layout"
import User from "../../components/User/User"
import styles from "./PostPage.module.css"

function PostPage() {
  return (
    <section>
      <div className=" p1">
        <User customClass={styles.user} showBtn={false} />
      </div>
      <div className={styles.postDescription__box + " p1"}>
        <p className={styles.postDescription__text}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
          reiciendis error dolores quae, harum ullam perferendis sed? Quo odit
          doloremque cupiditate porro, nisi voluptatibus consequuntur error
          illum necessitatibus dolorem voluptates deserunt tempora accusantium
          delectus hic autem obcaecati blanditiis, perferendis nesciunt
          laboriosam corporis voluptatum sequi? Distinctio.
        </p>
      </div>
      <div className="p1">
        <img src="https://source.unsplash.com/random/400x400?sig=3" />
      </div>
      <div className={styles.comment__box}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </section>
  )
}

export default PostPage
