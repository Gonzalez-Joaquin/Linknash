import { BrowserRouter, Route } from 'react-router-dom'
import { Suspense } from 'react'

import { RoutesWithNotFound } from '../utils'
import { routes, Route as IRoute } from '.'
import { Loader } from '../components'

const Navigation = () => {
  const renderRoutes = (routes: Array<IRoute>) => {
    return routes.map(({ path, children, Component }) => (
      <Route key={path} path={path} element={<Component />}>
        {children && children.length > 0 ? renderRoutes(children) : null}
      </Route>
    ))
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <RoutesWithNotFound>{renderRoutes(routes)}</RoutesWithNotFound>
      </Suspense>
    </BrowserRouter>
  )
}

export default Navigation
