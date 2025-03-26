import { Request, Response, NextFunction } from "express"

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Error:", err)

  res.status(err.response?.status || 500).json({
    message: err.response?.data?.message || "Error interno del servidor",
    error: err.response?.data || err.message
  })
}

export default errorHandler
