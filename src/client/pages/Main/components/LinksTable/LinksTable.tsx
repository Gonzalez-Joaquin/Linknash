import { Fragment, useEffect, useState } from "react"

import Table, {
  Body,
  Cell,
  Paginator,
  Row,
  TableButtons,
  TableHead
} from "../../../../components/Table"
import { deleteLink, getLinks } from "../../../../utils/api"
import { ArrayLinks } from "../../../../@types"
import style from "./LinksTable.module.css"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return (
    date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + ` ${date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`
  )
}

interface Props {
  changeSelectId: (id: string) => void
}

const LinksTable = ({ changeSelectId }: Props) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [allIds, setAllIds] = useState<Array<string>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [all, setAll] = useState<ArrayLinks>([])
  const [pageSize, setPageSize] = useState(10)

  const [deleteLoader, setDeleteLoader] = useState<{ id?: string; state: boolean }>({
    id: undefined,
    state: false
  })

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await getLinks()
      console.log(response)
      setTotalPages(response.totalPages)
      setAll(response.content)
      setPageSize(response.pageable.pageSize)
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeleteLoader({ id, state: true })
      await deleteLink(id)
      fetchData()
      setDeleteLoader({ id: undefined, state: false })
    } catch (error) {
      console.log(error)
      setDeleteLoader({ id: undefined, state: false })
    }
  }


  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const changePage = (page: number) => {
    setCurrentPage(() => Math.max(1, Math.min(page, totalPages)))
  }

  useEffect(() => {
    setAllIds(all?.map((item) => item.id) || [])
  }, [all])

  useEffect(() => {
    fetchData()
  }, [currentPage])

  return (
    <article className={style.article}>
      <Table
        page={"links"}
        allIds={allIds}
        loading={isLoading}
        selectedIds={selectedIds}
        extraEmpty={{ text: true }}
        setSelectedIds={setSelectedIds}
      >
        {({}) => (
          <>
            <TableHead
              page={"links"}
              columns={[
                { name: "name", align: "start" },
                { name: "url", align: "center" },
                { name: "creation", align: "end" },
                { name: "updated", align: "end" },
                { name: "actions" }
              ]}
            />
            <Body colSpan={5}>
              {all?.map((item, idx) => (
                <Fragment key={item.id}>
                  <Row
                    className={
                      deleteLoader.id === item.id && deleteLoader.state ? style.loading : ""
                    }
                  >
                    <Cell align="start" className={style.name}>
                      {item.name}
                    </Cell>
                    <Cell align="center">{item.url}</Cell>
                    <Cell align="end">{formatDate(item.timestamp)}</Cell>
                    <Cell align="end">{formatDate(item.last_update)}</Cell>
                    <TableButtons
                      trash={() => handleDelete(item.id)}
                      edit={() => changeSelectId(item.id)}
                    />
                  </Row>
                  {all.length < pageSize && all.length === idx + 1 && (
                    <Row className={style.lastOne}>
                      <></>
                    </Row>
                  )}
                </Fragment>
              ))}
            </Body>
            <Paginator currentPage={currentPage} totalPages={totalPages} exactPage={changePage} nextPage={nextPage} prevPage={prevPage}  />
          </>
        )}
      </Table>
    </article>
  )
}

export default LinksTable
