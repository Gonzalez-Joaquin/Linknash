import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { useToast } from "../../components/Toast"
import { createUser } from "../../store/reducers"
import { Button, Input } from "../../components"
import { UserLoginDTO } from "../../@types"
import users from "../../data/users.json"
import style from "./Login.module.css"
import logoPic from "/enlace.png"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = localStorage.getItem("Linknash-user")
    if (loggedUser) {
      navigate("/dashboard")
    }
  }, [navigate])

  const [animationEnd, setAnimationEnd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<UserLoginDTO>({
    email: "",
    password: ""
  })

  const { showToast } = useToast()

  const tryLogin = async () => {
    setIsLoading(true)

    setTimeout(() => {
      const res = users.find((u) => u.email === user.email)

      if (res) {
        if (user.password === res.password) {
          dispatch(createUser(res))
          navigate("/dashboard")
        } else {
          showToast( { message: "Contraseña incorrecta o Email incorrecto", }, 'error')
        }
      } else {
        showToast({  message: "Usuario no encontrado", }, 'warning')
      }

      setIsLoading(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (user.email !== "" && user.password !== "") {
      tryLogin()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className={style.section}>
      <article className={style.article}>
        <form
          onSubmit={handleSubmit}
          className={`${style.form} ${style[animationEnd ? "formEnd" : ""]}`}
        >
          <div className={style.container} onAnimationEnd={() => setAnimationEnd(true)}>
            <div className={style.logo}>
              <img src={logoPic} alt="logo" />
            </div>
            <h1 className={style.title}>LinkNash</h1>
          </div>
          <div className={style.content}>
            <div className={style["content-header"]}>
              <div className={style.logo}>
                <img src={logoPic} alt="logo" />
              </div>
              <h2 className={style.title}>LinkNash</h2>
            </div>
            <div className={style["content-body"]}>
              <Input
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                disabled={isLoading}
                className={style.input}
                onChange={handleChange}
              />
              <Input
                name="password"
                label="Contraseña"
                placeholder="Contraseña"
                type="password"
                disabled={isLoading}
                className={style.input}
                onChange={handleChange}
              />
            </div>
            <div className={style["content-footer"]}>
              <div className={style.shape}></div>
              <Button
                type="submit"
                loading={isLoading}
                value="Iniciar sesión"
                className={style.button}
              />
            </div>
          </div>
        </form>
      </article>
    </section>
  )
}

export default Login
