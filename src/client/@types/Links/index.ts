interface LinkDTO {
  id: string
  url: string
  name: string
  timestamp: string
  client_id: string,
  last_update: string
}

type ArrayLinks = Array<LinkDTO>

export type { LinkDTO, ArrayLinks }
