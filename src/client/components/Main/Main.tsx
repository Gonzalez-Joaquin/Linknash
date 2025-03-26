import styles from "./Main.module.css"

interface MainProps {
  children: React.ReactNode
  className?: string
}

const Main = ({ children, className }: MainProps) => {
  return (
    <main className={`${styles.container} ${className ?? ""}`}>
      <div className={styles["main-content"]}>{children}</div>
    </main>
  )
}

export default Main
