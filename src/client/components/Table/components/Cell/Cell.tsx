import React, { useEffect, useRef, useState } from "react"

import style from "./cell.module.css"
import Assets from "./assets"

interface Props {
  children: React.ReactNode
  id?: string
  align?: "start" | "center" | "end"
  sortable?: {
    active: boolean
    onSort: () => void
  }
  className?: string
  customStyle?: React.CSSProperties
  withTooltip?: boolean
  idx?: number
  onClick?: () => void
}

const Cell = ({
  id,
  children,
  className,
  customStyle,
  align = "center",
  sortable,
  withTooltip = true,
  idx,
  onClick
}: Props) => {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const cellRef = useRef<HTMLTableCellElement>(null)

  const checkOverflow = () => {
    if (cellRef.current) {
      setIsOverflowing(cellRef.current.scrollWidth > cellRef.current.clientWidth)
    }
  }

  useEffect(() => {
    if (withTooltip === false) {
      return
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => {
      window.removeEventListener("resize", checkOverflow)
    }
  }, [])

  useEffect(() => {
    if (withTooltip === false) {
      return
    }

    checkOverflow()
  }, [children])

  return (
    <td
      id={id}
      className={`${style.cell} ${className || undefined} ${
        style[sortable ? "onSortActive" : ""]
      } ${style[sortable?.active ? "sortActive" : ""]} ${
        style[!withTooltip ? "withoutTooltip" : ""]
      } ${style[idx !== undefined && idx === 0 ? "firstRow" : ""]}`}
      style={customStyle || { textAlign: align }}
      onClick={(e) => {
        if (onClick || sortable?.onSort) {
          e.preventDefault()
          e.stopPropagation()

          if (sortable) {
            return sortable.onSort()
          }

          if (onClick) {
            return onClick()
          }
        }
      }}
    >
      {isOverflowing && <div className={style.tooltip}>{children}</div>}
      <div
        className={`
          ${style.cellContainer}
          ${sortable ? style.sortContainer : ""}
          ${isOverflowing ? style.overflowing : ""}
        `}
        ref={cellRef}
      >
        {children}
        {sortable ? <div className={style.iconSort}>{Assets.arrow}</div> : null}
      </div>
    </td>
  )
}

export default Cell
