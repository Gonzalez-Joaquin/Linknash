import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { resetUser } from '../../store/reducers'
import { routes } from '../../routes'
import { Item } from './components'

import style from './Nav.module.css'
import Assets from './assets'
import { Logo } from '..'

const Nav = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const [linkOpen, setLinkOpen] = useState<string | undefined>()
  const [isOpen, setLocalIsOpen] = useState(() => {
    return sessionStorage.getItem('navIsOpen') === 'true'
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminRoutes =
    routes.find(({ path }) => path === '/dashboard')?.children || []

  useEffect(() => {
    sessionStorage.setItem('navIsOpen', String(isOpen))
    setIsOpen(isOpen)
  }, [isOpen, setIsOpen])

  const logOut = () => {
    dispatch(resetUser())
  }

  const goToHome = () => {
    navigate('/dashboard', { replace: true })
  }

  const handleArrowClick = () => {
    const newState = !isOpen
    if (linkOpen !== undefined) {
      setLinkOpen(undefined)
      setTimeout(() => {
        setLocalIsOpen(newState)
      }, 350)
    } else {
      setLocalIsOpen(newState)
    }
  }

  const handleClick = (path: string) => {
    setLinkOpen(linkOpen === path ? '' : path)
  }

  return (
    <nav className={`${style.nav} ${isOpen ? style.openNav : ''}`}>
      <div className={style['nav-header']}>
        <Logo onClick={goToHome} />

        <div className={style['arrow-container']}>
          <button
            className={`${style.arrow} ${style[isOpen ? 'open' : '']}`}
            onClick={handleArrowClick}>
            {Assets.arrow}
          </button>
        </div>
      </div>
      <ul className={style.list}>
        {adminRoutes.map((route) => (
          <Item
            {...route}
            key={route.path}
            isOpen={linkOpen === route.path}
            onClick={() => handleClick(route.path)}
          />
        ))}

        <Item
          path='/'
          name='Salir'
          icon={Assets.logout}
          onClick={logOut}
          className={style.logout}
        />
      </ul>
    </nav>
  )
}

export default Nav
