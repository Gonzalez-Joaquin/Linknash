import style from './TableLoader.module.css'

interface Props {
  color?: string
}

const TableLoader = ({ color }: Props) => {
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

export default TableLoader
