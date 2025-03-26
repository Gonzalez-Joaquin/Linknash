import { LazyExoticComponent, lazy, JSX } from "react"

import { RedirectToMenu } from "../utils"
import { Guard } from "../guard"
import { Login } from "../pages"
import Assets from "./assets"

type JSXComponent = () => JSX.Element

export interface Route {
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
  name: string
  icon?: JSX.Element
  desc?: string
  roles?: Array<string>
  children?: Array<Route>
  navOmit?: boolean
}

const normalizeRoutes = (routes: Array<Route>, basePath = ""): Array<Route> => {
  return routes.map((route) => {
    const fullPath = `${basePath}/${route.path}`.replace(/\/+/g, "/")
    return {
      ...route,
      path: fullPath,
      children: route.children ? normalizeRoutes(route.children, fullPath) : undefined
    }
  })
}

export const routes: Array<Route> = normalizeRoutes([
  {
    navOmit: true,
    path: "/",
    name: "Inicio",
    Component: Login
  },
  {
    path: "/dashboard",
    name: "Panel de Finanzas",
    Component: Guard,
    children: [
      {
        navOmit: true,
        path: "",
        name: "",
        Component: RedirectToMenu
      },
      {
        path: "menu",
        name: "Inicio",
        icon: Assets.main,
        Component: lazy(() => import("../pages/Main/Main"))
      }
    ]
  }
])
