export function Footer() {
  return (
    <>
      <a href={`${Homepage}/blob/main/LICENSE`} target="_blank">MIT LICENSE</a>
      <span>
        <span>NewsNow © 2024 By </span>
        <a href={Author.url} target="_blank">
          {Author.name}
        </a>
        .
        {" "}
        <a href="https://www.thus.chat/" target="_blank" rel="noopener noreferrer">ELIO AI LAB</a>
        . Elio Grove
      </span>
    </>
  )
}
