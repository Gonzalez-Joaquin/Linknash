import express, { Application } from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"

import linksRoutes from "./routes/links.routes"
import { errorHandler } from "./utils"

dotenv.config()

class App {
  private App: Application

  constructor(private PORT?: number | string) {
    this.App = express()
    this.Settings()
    this.MiddleWares()
    this.Routes()
    this.ErrorHandling()
  }

  private Settings() {
    this.App.set("port", this.PORT || process.env.PORT || 5000)
  }

  private MiddleWares() {
    this.App.use(cors())
    this.App.use(morgan("dev"))
    this.App.use(express.json())
  }

  private ErrorHandling() {
    this.App.use(errorHandler)
  }

  private Routes() {
    this.App.use("/api/links", linksRoutes)
  }

  async Listen() {
    await this.App.listen(this.App.get("port"))
    console.log(`✅ Servidor corriendo en http://localhost:${this.App.get("port")}`)
  }
}

export default App
