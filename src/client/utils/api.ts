import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_EXPRESS_LINKS_URL || "http://localhost:5000/api/links"

export const createLink = async (data: { name: string; url: string }) => {
  try {
    const response = await axios.post(API_BASE_URL, data)
    return response.data
  } catch (error) {
    throw new Error("Error al crear el enlace")
  }
}

export const updateLink = async (id: string, data: { name: string; url: string }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error("Error al actualizar el enlace")
  }
}

export const getLinks = async () => {
  try {
    const response = await axios.get(API_BASE_URL)

    return response.data
  } catch (error) {
    throw new Error("Error al obtener los enlaces")
  }
}

export const getLink = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`)

    return response.data
  } catch (error) {
    throw new Error("Error al obtener el enlace")
  }
}

export const deleteLink = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error("Error al eliminar el enlace")
  }
}
