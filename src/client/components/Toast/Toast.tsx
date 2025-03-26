import { useEffect } from 'react'

import styles from './Toast.module.css'
import { useToast } from '.'

interface Props {
  children: React.ReactNode
  type?: 'success' | 'error' | 'warning'
}

const Toast = ({ children, type = 'success' }: Props) => {
  const { isExiting, closeToast } = useToast()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeToast()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className={`${styles.overlay} ${styles[type]}`} onClick={closeToast}>
      <div
        className={`${styles.toast} ${isExiting ? styles.hide : styles.show}`}
        onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={closeToast}>
          <i className={`${styles.icon} fi fi-br-cross`} />
        </button>
      </div>
    </div>
  )
}

export default Toast
