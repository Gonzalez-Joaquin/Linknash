import style from './body.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  colSpan?: number
}

const Body = ({ children, className, colSpan }: Props) => {
  return colSpan ? (
    <tbody className={`${className}`}>
      <tr>
        <td colSpan={colSpan} className={style.td}>
          <div className={style.container}>
            <table className={style['inner-table']}>
              <tbody className={style.body}>{children}</tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody className={`${style.body} ${className}`}>{children}</tbody>
  )
}

export default Body
