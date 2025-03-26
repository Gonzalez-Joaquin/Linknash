import { TableCheckbox } from '..'
import style from './row.module.css'

interface Props {
  children: React.ReactNode
  withCheckboxes?: boolean
  withArrow?: boolean
  id?: string
  value?: boolean
  className?: string
  styles?: React.CSSProperties
  onChange?: () => void
  onClickRow?: () => void
  onClickArrow?: () => void
}

const Row = ({
  id,
  value,
  styles,
  children,
  withArrow,
  className,
  withCheckboxes,
  onChange,
  onClickRow,
}: Props) => {
  return (
    <tr
      className={`${style.row} ${className || ''} ${
        value ? style.selected : ''
      }`}
      style={styles}
      onClick={onClickRow}
      data-id={id}>
      {withCheckboxes ? (
        <td
          className={style.container}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}>
          <TableCheckbox
            value={value!}
            onChange={onChange!}
            id={`${
              !withArrow
                ? 'table-head-row-checkbox-' + id!
                : 'table-body-row-checkbox-' + id!
            }`}
          />
        </td>
      ) : null}
      {children}
    </tr>
  )
}

export default Row
