import { Request, Response } from "express"
import axios from "axios"

import { asyncHandler } from "../utils"

const API_BASE_URL =
  process.env.VITE_SERVER_URL || "https://nashlinks-production.up.railway.app/enlaces"

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const { page = 0, size = 10, sortBy = "id" } = req.query
  const response = await axios.get(API_BASE_URL, { params: { page, size, sortBy } })
  res.json(response.data)
})

const getEntry = asyncHandler(async (req: Request, res: Response) => {
  const response = await axios.get(`${API_BASE_URL}/${req.params.id}`)
  res.json(response.data)
})

const create = asyncHandler(async (req: Request, res: Response) => {
  const response = await axios.post(API_BASE_URL, req.body)
  res.json(response.data)
})

const updateEntry = asyncHandler(async (req: Request, res: Response) => {
  const response = await axios.put(`${API_BASE_URL}/${req.params.id}`, req.body)
  res.json(response.data)
})

const deleteEntry = asyncHandler(async (req: Request, res: Response) => {
  await axios.delete(`${API_BASE_URL}/${req.params.id}`)
  res.json({ message: `El enlace con ID ${req.params.id} fue eliminado` })
})

export default { getAll, getEntry, create, updateEntry, deleteEntry }
