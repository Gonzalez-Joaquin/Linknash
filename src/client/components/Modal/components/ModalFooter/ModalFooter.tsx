import style from "./ModalFooter.module.css"

interface Props {
  className?: string
  children?: React.ReactNode
  styles?: React.CSSProperties
}

const ModalFooter = ({ styles, className, children }: Props) => {
  return (
    children && (
      <div className={`${style.container} ${className}`} style={styles}>
        {children}
      </div>
    )
  )
}

export default ModalFooter
