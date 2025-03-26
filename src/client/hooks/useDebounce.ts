import { useRef, useEffect } from "react"

const useDebounce = () => {
  const timeout = useRef<any>(undefined)

  const debounce =
    (func: any, wait: any) =>
    (...args: any) => {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => func(...args), wait)
    }

  useEffect(() => {
    return () => {
      if (!timeout.current) {
        return
      }
      clearTimeout(timeout.current)
    }
  }, [])

  return debounce
}

export default useDebounce
