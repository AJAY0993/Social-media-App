import styles from "./List.module.css"

function List({ title, items, render, failureMessage }) {
  if (items.length < 1) return <h3>{failureMessage}</h3>
  return (
    <div className={`${styles.list} flex col p-2`}>
      <h3 className={`${styles.title} my-1 p1`}>{title}</h3>
      {items.map(render)}
    </div>
  )
}

export default List
