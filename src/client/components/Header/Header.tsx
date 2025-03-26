import style from './Header.module.css'
import { User } from '../'
import { useAppSelector } from '../../store/hooks'

interface Props {
  className?: string
  children?: React.ReactNode
}

const HeaderComponent = ({ children, className }: Props) => {
  return (
    <header className={`${style.header}`}>
      <div className={`${style.container} ${className ?? ''}`}>{children}</div>
    </header>
  )
}

const DefaultHeader = () => {
  const { name, email } = useAppSelector((state) => state.user)

  return (
    <div className={style.user}>
      <User name={name} size='medium + info' info={email} />
    </div>
  )
}

const Header = Object.assign(HeaderComponent, {
  default: DefaultHeader,
})

export default Header
