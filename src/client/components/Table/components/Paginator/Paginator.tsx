import { useEffect, useState } from "react"

import { useDebounce } from "../../../../hooks"
import style from "./paginator.module.css"

interface Props {
  currentPage: number
  totalPages: number
  exactPage: (page: number) => void
  className?: string
  nextPage?: () => void
  prevPage?: () => void
}

const Paginator = ({
  className,
  totalPages,
  currentPage,
  prevPage,
  nextPage,
  exactPage
}: Props) => {
  const [current, setCurrent] = useState<number>(currentPage)
  const [init, setInit] = useState<number>(current)
  const debounce = useDebounce()

  useEffect(() => {
    setCurrent(currentPage)
    setInit(currentPage)
  }, [currentPage])

  const debouncedSearch = debounce(exactPage, 1000)

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { valueAsNumber } = e.target
    if (valueAsNumber > totalPages) {
      valueAsNumber = totalPages
    }
    if (valueAsNumber < 1) {
      valueAsNumber = 1
    }

    setCurrent(valueAsNumber)
    if (!isNaN(valueAsNumber)) {
      debouncedSearch(valueAsNumber)
      setInit(valueAsNumber)
    }
  }

  const onBlurPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target
    if (isNaN(valueAsNumber)) {
      setCurrent(init)
    }
  }

  const handleDecrement = () => {
    setCurrent(current - 1)
    exactPage(current - 1)
  }

  const handleIncrement = () => {
    setCurrent(current + 1)
    exactPage(current + 1)
  }

  return (
    <tfoot className={`${style.foot} ${className || ""}`}>
      {totalPages > 1 ? (
        <tr className={style.row}>
          <td className={style.cell}>
            <span>Página</span>
            <input
              name="table-foot-row-cell-paginator-input"
              id="table-foot-row-cell-paginator-input"
              className={style.input}
              type="number"
              value={current}
              onChange={handlePageChange}
              onBlur={onBlurPageChange}
            />
            <span>
              de &nbsp;
              <b>{totalPages}</b>
            </span>
            <div className={style.buttonsContainer}>
              <button
                onClick={prevPage || handleDecrement}
                type="button"
                id="table-foot-row-cell-button-prevButton"
              >
                <svg
                  width="9"
                  height="17"
                  viewBox="0 0 9 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.44855 15.1379L1.41406 8.50001L7.44855 1.86208"
                    stroke="#A1A9C7"
                    strokeWidth="2.41379"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={nextPage || handleIncrement}
                id="table-foot-row-cell-button-nextButton"
              >
                <svg
                  width="9"
                  height="17"
                  viewBox="0 0 9 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.41474 15.1379L7.44922 8.50001L1.41474 1.86208"
                    stroke="#A1A9C7"
                    strokeWidth="2.41379"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      ) : null}
    </tfoot>
  )
}

export default Paginator
