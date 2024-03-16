import { useState } from "react"

import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import EmojiPicker from "emoji-picker-react"

import { BiImageAdd } from "react-icons/bi"
import { GoSmiley } from "react-icons/go"
import { IoIosSend } from "react-icons/io"
import { getUser } from "../../reducer/userSlice"
import { extractTags } from "./../../utils/helpers"

import styles from "./CreatePost.module.css"
import useCreatePost from "../../hooks/useCreatePost"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

function CreatePost() {
  const user = useSelector(getUser)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState
  } = useForm()

  const { errors } = formState
  const { createPost, isCreating } = useCreatePost()
  const selectedImage = watch("image")

  const onSubmit = (data) => {
    createPost(
      {
        ...data,
        image: data.image[0],
        tags: extractTags(data.content)
      },
      {
        onSuccess: reset
      }
    )
  }
  return (
    <section className={styles.hero + " flex"}>
      <div className={styles.user__image}>
        <img
          className="btn--circle"
          src={user?.profilePic || "https://i.ibb.co/mBXRT6g/profile-user.png"}
          alt="profile-user"
          border="0"
        />
      </div>
      <form
        method="POST"
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.form__container + " flex col"}>
          <div className={styles.img__preview}>
            {selectedImage?.[0] && (
              <img
                className={styles.img__preview}
                src={URL.createObjectURL(selectedImage[0])}
              />
            )}
          </div>
          <div className={styles.text__caption}>
            <input
              className="inp "
              placeholder="Caption"
              {...register("caption", { required: "A post have a caption" })}
            />
            {errors?.caption && (
              <ErrorMessage message={errors.caption.message} />
            )}
          </div>
          <div className={styles.text__content}>
            <textarea
              type="text"
              name="content"
              placeholder="What's up?"
              {...register("content", {
                required: "A post must have some content",
                maxLength: {
                  value: 200,
                  message: "Max allowed characters are 200"
                }
              })}
            />
            {errors?.content && (
              <ErrorMessage message={errors.content.message} />
            )}
          </div>

          <div className={`${styles.footer} flex j-between a-center`}>
            <div className={styles.file}>
              <label
                htmlFor={styles.file__input}
                id={styles.label__file__input}
              >
                <BiImageAdd fontSize={"1.8rem"} />{" "}
              </label>
              <input
                type="file"
                name="image"
                id={styles.file__input}
                accept=".jpg, .png, .jpeg"
                multiple={false}
                {...register("image")}
              />
            </div>
            <MyEmojiPicker
              cb={(emoji) => setValue("content", getValues("content") + emoji)}
            />
            <div className={styles.btn__wrapper}>
              <button
                className="btn btn__primary btn--rounded"
                disabled={isCreating}
              >
                <IoIosSend fontSize={"2rem"} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

function MyEmojiPicker({ cb }) {
  const [emojiPicker, setEmojiPicker] = useState(false)

  const toggleEmojiPicker = () => {
    setEmojiPicker((s) => !s)
  }
  const handleEmojiClick = (emoji) => {
    cb(emoji.emoji)
  }

  return (
    <div className={styles.emojiPicker__wrapper}>
      <GoSmiley
        fontSize="1.5rem"
        cursor="pointer"
        onClick={toggleEmojiPicker}
      />
      <div className={styles.emojiPicker__container}>
        <EmojiPicker open={emojiPicker} onEmojiClick={handleEmojiClick} />
      </div>
    </div>
  )
}

export default CreatePost
