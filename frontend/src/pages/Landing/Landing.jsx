import { useNavigate } from "react-router-dom"
import styles from "./Landing.module.css"

function Landing() {
  const navigate = useNavigate()
  const handleClick = () => navigate("/signup")

  return (
    <main className={styles.landing}>
      <section className="container">
        <div className={styles.landing__container}>
          <div className={styles.image__container}>
            <picture>
              <source
                media="(max-width: 599px)"
                srcSet="images/landingSmall.png"
              />
              <source
                media="(min-width: 600px)"
                srcSet="images/landingBig.png"
              />
              <img
                src="elva-800w.jpg"
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
          </div>
          <div className={styles.landing__content}>
            <h2 className={styles.landing__heading}>
              Lets's connect with each other
            </h2>
            <p className={styles.landing__text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, ipsa vero.
            </p>
            <div className={styles.seprator__container}>
              <span
                className={
                  styles.landing__seprator +
                  " " +
                  styles["landing__seprator--long"]
                }
              ></span>
              <span
                className={
                  styles.landing__seprator +
                  " " +
                  styles["landing__seprator--short"]
                }
              ></span>
              <span
                className={
                  styles.landing__seprator +
                  " " +
                  styles["landing__seprator--short"]
                }
              ></span>
            </div>
            <button className="btn btn__primary" onClick={handleClick}>
              Get started
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
