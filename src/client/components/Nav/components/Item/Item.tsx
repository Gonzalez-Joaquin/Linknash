import { NavLink } from 'react-router-dom'
import { Route } from '../../../../routes'
import style from './Item.module.css'
import Assets from '../../assets'
import { useEffect, useState } from 'react'

type RouteProps = Pick<Route, 'icon' | 'name' | 'path' | 'navOmit' | 'children'>

interface Props extends RouteProps {
  isOpen?: boolean
  className?: string
  onClick?: () => void
}

const Item = ({
  name,
  path,
  icon,
  navOmit,
  className,
  children,
  isOpen = false,
  onClick,
}: Props) => {
  const [linkOpen, setLinkOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      setLinkOpen(true)
    } else {
      setTimeout(() => {
        setLinkOpen(false)
      }, 350)
    }
  }, [isOpen])

  return (
    !navOmit && (
      <li
        className={`${style.item} ${className}`}
        style={{
          overflow:
            children &&
            children.length !== 0 &&
            children.some((route) => route.navOmit !== true) &&
            linkOpen
              ? 'visible'
              : 'hidden',
        }}
        onClick={children && children.length !== 0 ? undefined : onClick}>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${style[isOpen ? 'open' : '']} ${
              style[isActive && path !== '' ? 'active' : '']
            }`
          }
          to={path}>
          <div className={style.icon}>{icon ?? Assets['not-found']}</div>
          <span className={style.text}>{name}</span>

          {children &&
            children.length !== 0 &&
            children.some((route) => route.navOmit !== true) && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClick && onClick()
                }}
                className={`${style.arrow} ${style[isOpen ? 'open' : '']}`}>
                {Assets['arrow-alt']}
              </button>
            )}
        </NavLink>
        {children &&
          children.length !== 0 &&
          children.some((route) => route.navOmit !== true) && (
            <ul className={`${style.content} ${style[isOpen ? 'open' : '']}`}>
              {children.map((route) => (
                <Item {...route} key={route.path} />
              ))}
            </ul>
          )}
      </li>
    )
  )
}

export default Item
