interface LinkDTO {
  id: string
  url: string
  name: string
  timestamp: string
  last_update: string
}

type ArrayLinks = Array<LinkDTO>

export type { LinkDTO, ArrayLinks }
