import { Router } from "express"

import controller from "../controllers/links.controller"

const linkRoutes = Router()

linkRoutes.get("/", controller.getAll).post("/", controller.create)

linkRoutes
  .get("/:id", controller.getEntry)
  .put("/:id", controller.updateEntry)
  .delete("/:id", controller.deleteEntry)

export default linkRoutes
