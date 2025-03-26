import { useEffect, useState } from "react"

import { Button, Input, Modal, ModalBody, ModalFooter } from "../../../../components"
import { createLink, getLink, updateLink } from "../../../../utils/api"
import { useToast } from "../../../../components/Toast"
import style from "./CreateLink.module.css"

interface Props {
  state: boolean
  selectedId: string | undefined
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateLink = ({ state, setState, selectedId }: Props) => {
  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = { name, url }
    try {
      if (selectedId) {
        await updateLink(selectedId, data)
        showToast({ message: "Enlace actualizado correctamente" }, "success")
        setName("")
        setUrl("")
      } else {
        await createLink(data)
        showToast({ message: "Enlace creado correctamente" }, "success")
        setName("")
        setUrl("")
      }
      setState(false)
    } catch (error) {
      showToast({message: error as string}, 'error')
    }
  }

  useEffect(() => {
    const fetchLink = async () => {
      if (!selectedId) return

      try {
        const response = await getLink(selectedId)
        setName(response.name)
        setUrl(response.url)
        setState(true)
      } catch (error) {
        console.log(error)
      }
    }

    fetchLink()
  }, [selectedId])

  return (
    <Modal
      className={style.modal}
      state={state}
      setState={setState}
      modalHeader={<h3 className={style.title}>{selectedId ? "Editar" : "Crear"} Link</h3>}
    >
      {({ closeModal }) => (
        <form className={style.form} onSubmit={handleSubmit}>
          <ModalBody className={style.body}>
            <Input
              name="name"
              placeholder="Ingrese su nombre"
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="url"
              placeholder="Ingrese la url"
              label="Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </ModalBody>
          <ModalFooter className={style.footer}>
            <Button value="Cancelar" onClick={closeModal} />
            <Button type="submit" value={selectedId ? "Actualizar" : "Crear"} />
          </ModalFooter>
        </form>
      )}
    </Modal>
  )
}

export default CreateLink
