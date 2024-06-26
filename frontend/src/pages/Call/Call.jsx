import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Button from "../../components/Button/Button"
import { getCall, getIsOnCall } from "../../reducer/peerSlice"
import styles from "./Call.module.css"

const getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia

function Call() {
  const navigate = useNavigate()
  const localRef = useRef(null)
  const isOnCall = useSelector(getIsOnCall)
  const call = useSelector(getCall)

  const handleCallRejection = () => {
    call.close()
    alert("You rejected the call")
    navigate("/")
  }

  useEffect(() => {
    if (!isOnCall) {
      navigate("/")
    }
    if (isOnCall) {
      getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localRef.current.srcObject = stream
        })
        .catch((err) => console.log(err))
    }
  }, [])

  if (!isOnCall) return <h3>Not on a call</h3>

  return (
    <section>
      <div className={styles.container} id="call-box">
        <video
          className={styles.localVid}
          autoPlay
          playsInline
          ref={localRef}
        />

        <Button type="danger" onClick={handleCallRejection}>
          Cut
        </Button>
      </div>
    </section>
  )
}

export default Call
