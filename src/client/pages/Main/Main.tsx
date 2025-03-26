import { LinksTable } from "./components/LinksTable"
import { Button } from "../../components"

import style from "./Main.module.css"
import Assets from "../../assets"
import { useState } from "react"
import CreateLink from "./components/CreateLink/CreateLink"

const Main = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={style.section}>
      <article className={style.head}>
        <div className={style.container}>
          <h2 className={style.title}>LinkNash</h2>
          <p className={style.p}>Road to Goat</p>
        </div>
        <Button
          className={style.button}
          icon={Assets.arrow}
          leftIcon
          onClick={() => {
            setSelectedId(undefined)
            setIsOpen(true)
          }}
        />
      </article>
      <LinksTable changeSelectId={(id) => setSelectedId(id)} />
      <CreateLink state={isOpen} setState={setIsOpen} selectedId={selectedId} />
    </section>
  )
}

export default Main
