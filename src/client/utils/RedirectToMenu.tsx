import { Navigate } from 'react-router-dom'

const RedirectToMenu = () => {
  return <Navigate replace to='/dashboard/menu' />
}

export default RedirectToMenu
