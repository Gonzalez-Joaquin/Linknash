import styles from './Tag.module.css'

interface Props {
  label: string
  color?: string
}

const Tag = ({ label, color }: Props) => {
  return (
    <div
      className={styles.tag}
      style={
        color
          ? ({ '--tag-color': `${color}` } as React.CSSProperties)
          : undefined
      }>
      <div></div>
      <span className={styles.span}>{label}</span>
    </div>
  )
}

export default Tag
