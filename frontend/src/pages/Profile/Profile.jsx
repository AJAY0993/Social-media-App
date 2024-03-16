import axios from "../../utils/axios"
import styles from "./Profile.module.css"
import { RiMessage2Line } from "react-icons/ri"
import useProfile from "../../hooks/useProfile"
import { useState } from "react"
import Modal from "../../components/Modal/Modal"
import { useSelector } from "react-redux"
import { getFollowing, getUser, getUserId } from "../../reducer/userSlice"
import Button from "../../components/Button/Button"
import { IoPencil } from "react-icons/io5"
import List from "../../components/List/List"
import User from "../../components/User/User"
import Loader from "../../components/Loader/Loader"
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile"
import useFollow from "./../../hooks/useFollow"
import useUnFollow from "./../../hooks/useUnFollow"
import { useNavigate } from "react-router-dom"

function Profile() {
  const { profile, isProfileLoading } = useProfile()
  const { follow, isFollowing } = useFollow()
  const { unFollow, isUnFollowing } = useUnFollow()
  const navigate = useNavigate()
  const userId = useSelector(getUserId)
  const following = useSelector(getFollowing)
  const numFollowers = profile?.followers?.length || 0
  const numFollowing = profile?.following?.length || 0
  const numPost = profile?.posts?.length || 0
  const [showModal, setShowModal] = useState(false)
  const isMe = (id) => {
    if (id === userId)
      return (
        <>
          <Button
            type="primary"
            variation="rounded"
            onClick={() => setShowModal(true)}
          >
            <IoPencil /> Edit
          </Button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <UpdateProfile close={() => setShowModal(false)} />
            </Modal>
          )}
        </>
      )
    return (
      <>
        <Button
          type="secondary"
          variation="rounded"
          onClick={() => navigate(`/messages/${id}`)}
        >
          {userId === profile._id ? (
            <>
              <RiMessage2Line /> Message
            </>
          ) : (
            "Message"
          )}
        </Button>
        <Button
          type="primary"
          variation="rounded"
          disabled={isFollowing || isUnFollowing}
          onClick={() => (following.includes(id) ? unFollow(id) : follow(id))}
        >
          {following.includes(id) ? "Unfollow" : "Follow"}
        </Button>
      </>
    )
  }
  if (isProfileLoading) return <Loader />
  return (
    <section className={styles.profile}>
      <div className={styles.profile__container}>
        <figure className={styles.box + " flex col a-center "}>
          <img
            className={styles.avatar}
            src={
              profile.profilePic ||
              "https://randomuser.me/api/portraits/men/99.jpg"
            }
            alt=""
          />
          <figcaption>
            <h3>{profile.username}</h3>

            <p>{profile.bio}</p>
          </figcaption>
        </figure>

        <div className={styles.btn__container + " flex j-center"}>
          {isMe(profile._id)}
        </div>
        <div className={styles.profile__stats + " flex j-center"}>
          <StatItem
            value={numFollowers}
            name="Followers"
            modalComponent={
              <List
                items={profile.followers || []}
                render={(user) => <User key={user._id} user={user} />}
                title="Followers"
                failureMessage="No one Follows you"
              />
            }
          />
          <StatItem
            value={numFollowing}
            name="Following"
            modalComponent={
              <List
                items={profile.following}
                render={(user) => <User key={user._id} user={user} />}
                title="Following"
                failureMessage="You dont follow anyone"
              />
            }
          />
          <StatItem value={numPost} name="Posts" />
        </div>
        <div className="flex col"></div>
      </div>
    </section>
  )
}

function StatItem({ value, name, modalComponent }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className={styles.box} onClickCapture={() => setIsModalOpen(true)}>
      <h3>{value}</h3>
      <span>{name}</span>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>{modalComponent}</Modal>
      )}
    </div>
  )
}

export async function loader() {
  const res = await axios("users/myProfile")
  return res.data.data.profile
}

export default Profile
