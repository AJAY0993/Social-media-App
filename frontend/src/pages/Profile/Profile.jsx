import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RiMessage2Line } from "react-icons/ri"
import { IoPencil } from "react-icons/io5"

import {
  addFollowing,
  getFollowing,
  getUserId,
  removeFollowing
} from "../../reducer/userSlice"

import Button from "../../components/Button/Button"
import List from "../../components/List/List"
import User from "../../components/User/User"
import Loader from "../../components/Loader/Loader"
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile"
import Modal from "../../components/Modal/Modal"

import useFollow from "./../../hooks/useFollow"
import useProfile from "../../hooks/useProfile"
import useUnFollow from "./../../hooks/useUnFollow"
import styles from "./Profile.module.css"

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profile, isProfileLoading, error } = useProfile()
  const { follow, isFollowing } = useFollow()
  const { unFollow, isUnFollowing } = useUnFollow()
  const userId = useSelector(getUserId)
  const following = useSelector(getFollowing)
  const numPost = profile?.posts?.length || 0
  const [showModal, setShowModal] = useState(false)

  const isMe = (id) => {
    if (id === userId)
      return (
        <>
          <Button
            type="primary"
            variation="rounded"
            width="normal"
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
          width="normal"
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
          width="normal"
          disabled={isFollowing || isUnFollowing}
          onClick={() =>
            following.includes(id)
              ? unFollow(id, dispatch(removeFollowing(id)))
              : follow(id, dispatch(addFollowing(id)))
          }
        >
          {following.includes(id) ? "Unfollow" : "Follow"}
        </Button>
      </>
    )
  }
  if (isProfileLoading) return <Loader />
  if (error) return <h3>{error.message}</h3>

  return (
    <section className={styles.profile}>
      <div className={styles.profile__container}>
        <figure className={styles.box + " flex col a-center "}>
          <img className={styles.avatar} src={profile.profilePic} alt="" />
          <figcaption>
            <h3>{profile.username}</h3>

            <p>{profile.bio}</p>
          </figcaption>
        </figure>

        <div className={styles.btn__container + " flex j-center"}>
          {isMe(profile._id)}
        </div>
        <div className={styles.profile__stats + " flex j-center"}>
          <Followers profile={profile} />
          <Following profile={profile} />
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

function Followers({ profile }) {
  const followers = profile.followers
  const numFollowers = followers.length
  const isMe = useSelector(getUserId) === profile._id
  const followersFailureMessage = isMe
    ? "No one follows you"
    : `No one follows ${profile.username}`

  return (
    <StatItem
      value={numFollowers}
      name="Followers"
      modalComponent={
        <List
          items={followers || []}
          render={(user) => (
            <User key={user._id} user={{ ...user, _id: user.followerId }} />
          )}
          title="Followers"
          failureMessage={followersFailureMessage}
        />
      }
    />
  )
}

function Following({ profile }) {
  const following = profile.following
  const numFollowing = following.length
  const isMe = useSelector(getUserId) === profile._id
  const followingFailureMessage = isMe
    ? "You are not following anyone"
    : `${profile.username} is not following anyone`

  return (
    <StatItem
      value={numFollowing}
      name="Following"
      modalComponent={
        <List
          items={following || []}
          render={(user) => (
            <User key={user._id} user={{ ...user, _id: user.followingId }} />
          )}
          title="Followers"
          failureMessage={followingFailureMessage}
        />
      }
    />
  )
}

// export async function loader() {
//   const res = await axios("users/myProfile")
//   return res.data.data.profile
// }

export default Profile
