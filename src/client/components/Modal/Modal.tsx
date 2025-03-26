import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import style from "./Modal.module.css"
import Assets from "./assets"

interface ModalHandlers {
  closeModal: () => void
}

interface Props {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  children: (args: ModalHandlers) => React.ReactNode
  modalHeader?: React.ReactNode
  className?: string
}

const eventListener = "keydown"

const Modal = ({ state, children, setState, modalHeader, className }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    setIsOpen(false)
    setTimeout(() => {
      setState(false)
    }, 450)
  }

  const modalRoot = document.getElementById("modal")

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }
    if (state) {
      document.addEventListener(eventListener, handleEsc)
    }

    return () => {
      document.removeEventListener(eventListener, handleEsc)
    }
  }, [state])

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setIsOpen(true)
      }, 100)
    }
  }, [state])

  const handlers: ModalHandlers = {
    closeModal
  }

  if (!state || !modalRoot) {
    return null
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
      className={`${style.overlay} ${style[isOpen ? "open" : ""]}`}
    >
      <div className={`${style.modal} ${className}`} onClick={handleContentClick} ref={modalRef}>
        {modalHeader && (
          <div className={style.header}>
            <div className={style.content}>{modalHeader}</div>
            <button className={style.close} onClick={closeModal}>
              {Assets.close}
            </button>
          </div>
        )}
        {children(handlers)}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
