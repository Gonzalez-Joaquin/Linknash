import style from "./ModalBody.module.css"

interface Props {
  background?: string
  className?: string
  children?: React.ReactNode
}

const ModalBody = ({ children, background, className }: Props) => {
  if (!children) {
    return null
  }

  const inlineStyles: Record<string, string> = {}

  if (background) {
    inlineStyles["--body-bg"] = background
  }

  return (
    <div className={`${style.body} ${className}`} style={inlineStyles}>
      <div className={style.container}>{children}</div>
    </div>
  )
}

export default ModalBody
