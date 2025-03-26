import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../store/hooks"
import { DefaultLayout } from "../layouts"

const AuthGuard = () => {
  const { email } = useAppSelector((state) => state.user)

  return email !== "" ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : (
    <Navigate replace to={"/"} />
  )
}

export default AuthGuard
