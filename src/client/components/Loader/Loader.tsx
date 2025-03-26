import style from './Loader.module.css'

interface Props {
  color?: string
}

const Loader = ({ color }: Props) => {
  return (
    <div
      className={style.item}
      style={
        color
          ? ({ '--loader-color': `#${color}` } as React.CSSProperties)
          : undefined
      }>
      <i className={`${style['loader']} ${style['--4']}`}></i>
    </div>
  )
}

export default Loader
