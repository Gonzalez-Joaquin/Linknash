import styles from "./tableCheckbox.module.css"

interface Props {
  id: string
  value: boolean
  onChange: (value: boolean) => void
}

const TableCheckbox = ({ value, onChange, id }: Props) => {
  return (
    <div
      className={styles["checkbox-wrapper-65"]}
      data-id={id}
      onClick={(e) => {
        e.stopPropagation()
        onChange(!value)
      }}
    >
      <label htmlFor={id} onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            e.stopPropagation()
            onChange(!value)
          }}
          id={id}
        />
        <span className={styles.cbx}>
          <svg width="12px" height="11px" viewBox="0 0 12 11">
            <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
          </svg>
        </span>
      </label>
    </div>
  )
}

export default TableCheckbox
