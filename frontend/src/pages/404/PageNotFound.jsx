import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import styles from "./PageNotFound.module.css"

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className={`flex col a-center j-center p1 ${styles.pageNotFound}`}>
      <img src="images/undraw_page_not_found_re_e9o6.svg" alt="404" />
      <Button type="primary" onClick={() => navigate("/home")}>
        Back to home
      </Button>
    </div>
  )
}

export default PageNotFound
