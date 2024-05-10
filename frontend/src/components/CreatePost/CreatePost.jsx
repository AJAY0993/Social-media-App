import { useState } from "react"

import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import EmojiPicker from "emoji-picker-react"

import { BiImageAdd } from "react-icons/bi"
import { GoSmiley } from "react-icons/go"
import { getUser } from "../../reducer/userSlice"
import { extractTags } from "./../../utils/helpers"

import useCreatePost from "../../hooks/useCreatePost"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Button from "../Button/Button"
import styles from "./CreatePost.module.css"

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
    <section className="flex j-center p1">
      <img
        className="btn--circle"
        src={user?.profilePic}
        alt="profile-user"
        border="0"
      />
      <form
        method="POST"
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.formContainer + " flex col"}>
          <div className={styles.imgPreview}>
            {selectedImage?.[0] && (
              <img src={URL.createObjectURL(selectedImage[0])} />
            )}
          </div>
          <div className={styles.postCaption}>
            <input
              placeholder="Caption"
              {...register("caption", { required: "A post have a caption" })}
            />
            {errors?.caption && (
              <ErrorMessage message={errors.caption.message} />
            )}
          </div>
          <div className={styles.postBody}>
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
            <div>
              <label
                className="flex col a-center"
                htmlFor={styles.fileInput}
                id={styles.labelFileInput}
              >
                <BiImageAdd fontSize={"1.8rem"} />{" "}
              </label>
              <input
                className={styles.fileInput}
                type="file"
                name="image"
                id={styles.fileInput}
                accept=".jpg, .png, .jpeg"
                multiple={false}
                {...register("image")}
              />
            </div>
            <MyEmojiPicker
              cb={(emoji) => setValue("content", getValues("content") + emoji)}
            />
          </div>
          <Button
            type="primary"
            variation="rounded"
            disabled={isCreating}
            width="full"
          >
            Post
          </Button>
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
    <div className={styles.emojiPickerWrapper}>
      <GoSmiley
        fontSize="1.5rem"
        cursor="pointer"
        onClick={toggleEmojiPicker}
      />
      <div className={styles.emojiPickerContainer}>
        <EmojiPicker open={emojiPicker} onEmojiClick={handleEmojiClick} />
      </div>
    </div>
  )
}

export default CreatePost
