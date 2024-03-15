function List({ title, items, render, failureMessage }) {
  if (items.length < 1) return <h3>{failureMessage}</h3>

  return (
    <div className="flex col p-2">
      <h3 className="my-1 p1">{title}</h3>
      {items.map(render)}
    </div>
  )
}

export default List
