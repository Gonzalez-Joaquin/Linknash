import { TableEmptyState } from "./components"
import useTable from "./hook/useTable"
import style from "./table.module.css"
import { Loader } from "../"

interface TableCardHandlers {
  toggleSelect: (id: string) => void
  isSelected: (id: string) => boolean
  toggleSelectAll: () => void
  selectedCount: number
  totalCount: number
  allAreSelected: boolean
}

interface TableProps {
  page: string
  allIds: string[]
  selectedIds: Set<string>
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>
  children: (args: TableCardHandlers) => React.ReactNode
  total?: number
  haveHeader?: boolean
  searchQuery?: string
  className?: string
  loading?: boolean
  headerChild?: React.ReactNode
  extraEmpty?: {
    button?: boolean
    text?: boolean
    callback?: () => void
  }
  header?: React.ReactNode
  footer?: React.ReactNode
}

const Table = (props: TableProps) => {
  const {
    total = 0,
    allIds,
    footer,
    header,
    className,
    selectedIds,
    loading = false,

    children,
    setSelectedIds
  } = props

  const { totalCount, isSelected, toggleSelect, selectedCount, allAreSelected, toggleSelectAll } =
    useTable(total, allIds, selectedIds, setSelectedIds)

  const handlers: TableCardHandlers = {
    totalCount,
    isSelected,
    toggleSelect,
    selectedCount,
    allAreSelected,
    toggleSelectAll: () => toggleSelectAll(allIds)
  }

  return (
    <div className={`${style.container} ${className}`}>
      {header && header}
      {loading ? (
        <div className={style.loader}>
          <Loader />
        </div>
      ) : allIds.length !== 0 ? (
        <table className={style.table}>{children(handlers)}</table>
      ) : (
        <TableEmptyState {...props} />
      )}
      {footer && footer}
    </div>
  )
}

export default Table
