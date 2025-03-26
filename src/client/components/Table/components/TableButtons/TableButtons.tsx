import style from "./tableButtons.module.css"

import Cell from "../Cell/Cell"
import Assets from "./assets"

interface Props {
  // A logic has to be implemented to know in what order and what buttons to show.
  // A component like this is created to stop being dependent on the `filter`
  // tag to change the colors of the svg's
  trash?: () => void
  edit?: () => void
  className?: string
}

export const EditButton = ({ edit }: Pick<Props, "edit">) => {
  return edit ? (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        edit()
      }}
      className={style.button}
    >
      {Assets.edit}
    </button>
  ) : null
}

export const TrashButton = ({ trash }: Pick<Props, "trash">) => {
  return trash ? (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        trash()
      }}
      className={`${style.button} ${style.trash}`}
    >
      {Assets.trash}
    </button>
  ) : null
}

const TableButtons = ({ trash, edit, className }: Props) => {
  return (
    <Cell className={`${style.cell} ${className}`} withTooltip>
      <TrashButton trash={trash} />
      <EditButton edit={edit} />
    </Cell>
  )
}

export default TableButtons
