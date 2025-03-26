import { useState, useEffect } from 'react'

import TableHead, { TableHeadProps } from '../TableHead/TableHead'
import style from './InnerTable.module.css'
import { TableLoader } from '..'

interface Props extends Omit<TableHeadProps, 'columns'> {
  columns?: TableHeadProps['columns']
  itemOpen: boolean
  colSpan: number
  loading?: boolean
  children: React.ReactNode
}

const InnerTable = (props: Props) => {
  const [isLeaving, setIsLeaving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { loading, colSpan, children, itemOpen = false, columns = [] } = props

  useEffect(() => {
    if (itemOpen === false) {
      setIsLeaving(true)
      setTimeout(() => {
        setIsLeaving(false)
        setIsOpen(false)
      }, 300)
    } else {
      setIsLeaving(false)
      setIsOpen(true)
    }
  }, [itemOpen])

  if (!isOpen) {
    return null
  }

  return (
    <tr className={style['row-container']}>
      <td colSpan={colSpan + 2}>
        <div
          className={`${style['inner-table-container']} ${
            isLeaving ? style.isLeaving : ''
          }`}>
          {loading ? (
            <TableLoader />
          ) : (
            <table className={style.table}>
              {columns.length !== 0 && (
                <TableHead columns={columns} {...props} />
              )}
              <tbody className={style.body}>{children}</tbody>
            </table>
          )}
        </div>
      </td>
    </tr>
  )
}

export default InnerTable
