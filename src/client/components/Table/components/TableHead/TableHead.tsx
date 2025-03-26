import { useTranslation } from 'react-i18next'

import { Head, Row, Cell } from '..'
export interface TableHeadProps {
  page: string | Array<string>
  columns: Array<{
    name: string
    sortable?: {
      active: boolean
      onSort: () => void
    }
    align?: 'start' | 'end' | 'center'
    className?: string
    withTooltip?: boolean
  }>
  withCheckboxes?: {
    id: string
    value?: boolean
    onChange: () => void
  }
  className?: string
}

const TableHead = ({
  columns,
  page,
  withCheckboxes,
  className,
}: TableHeadProps) => {
  const { t } = useTranslation()

  return (
    <Head className={className}>
      <Row
        withCheckboxes={withCheckboxes ? true : false}
        value={withCheckboxes?.value}
        onChange={withCheckboxes?.onChange}
        id={withCheckboxes?.id}>
        {columns.map((col, idx) => (
          <Cell
            key={idx}
            id={`${Array.isArray(page) ? page.join(`-`) : page}-table-head-${
              col.name
            }`}
            align={col.align}
            className={col.className}
            sortable={col.sortable || undefined}
            withTooltip={col.withTooltip}>
            {t(
              `${
                Array.isArray(page) ? page.join(`.`) : page
              }.table.head.cells.${col.name}`
            )}
          </Cell>
        ))}
      </Row>
    </Head>
  )
}

export default TableHead
