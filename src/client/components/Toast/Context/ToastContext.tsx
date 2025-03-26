import { createContext, useState, ReactNode } from "react"
import { Toast } from ".."

interface ToastProperties {
  message: string
  extraMessage?: string
}

interface ToastContextType {
  isExiting: boolean
  showToast: (properties: ToastProperties, type?: "success" | "error" | "warning") => void
  closeToast: () => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [typeToast, setTypeToast] = useState<"success" | "error" | "warning">("success")
  const [isExiting, setIsExiting] = useState(false)
  const [properties, setMessage] = useState<ToastProperties>({
    message: "",
    extraMessage: ""
  })
  const [open, setOpen] = useState(false)

  const closeToast = () => {
    setIsExiting(true)
    setTimeout(() => {
      setOpen(false)
      setIsExiting(false)
    }, 350)
  }

  const showToast = (msg: ToastProperties, type?: "success" | "error" | "warning") => {
    setMessage(msg)
    setTypeToast(type ?? "success")
    setOpen(true)
    setTimeout(() => closeToast(), 3000)
  }

  return (
    <ToastContext.Provider value={{ isExiting, showToast, closeToast }}>
      {children}
      {open && (
        <Toast type={typeToast}>
          <div className={"toast-content"}>
            <span>{properties.message}</span>
            {properties.extraMessage && <p>{properties.extraMessage}</p>}
          </div>
        </Toast>
      )}
    </ToastContext.Provider>
  )
}

export type { ToastContextType }
