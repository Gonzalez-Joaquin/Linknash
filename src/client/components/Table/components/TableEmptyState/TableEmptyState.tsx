import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import { Button } from '../../../Button'
import empty from './assets/empty.png'

import style from './tableEmptyState.module.css'
import Assets from './assets'

interface Props {
  page: string | Array<string>
  searchQuery?: string
  extraEmpty?: {
    button?: boolean
    text?: boolean
    callback?: () => void
  }
}

const TableEmptyState = ({ page, searchQuery, extraEmpty }: Props) => {
  const [formatedPage, setFormatedPage] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    setFormatedPage(Array.isArray(page) ? page.join('-') : page)
  }, [page])

  return (
    <div className={`${style.container}`}>
      <div className={style.content}>
        <div className={style.svg}>
          <img draggable={false} src={empty} />
        </div>
        {extraEmpty && (
          <>
            {extraEmpty && (
              <>
                {extraEmpty.text && (
                  <p className={style.text}>
                    {t(
                      `${
                        Array.isArray(page) ? page.join('.') : page
                      }.table.empty.${searchQuery !== '' ? 'search' : 'text'}`
                    )}
                  </p>
                )}
                {extraEmpty.button && (
                  <Button
                    icon={Assets.plus}
                    value={t(`${formatedPage}.table.empty.button`)}
                    onClick={(e) => {
                      e.stopPropagation()
                      extraEmpty.callback?.()
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default TableEmptyState
