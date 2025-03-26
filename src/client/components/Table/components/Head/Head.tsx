import React from "react"

import style from "./head.module.css"

interface Props {
  children: React.ReactNode
  className?: string
}

const Head = ({ children, className }: Props) => {
  return <thead className={`${style.head} ${className || ""}`}>{children}</thead>
}

export default Head
