import style from "./Logo.module.css"

import logo from "/enlace.png"

interface Props {
  onClick?: () => void
}

const Logo = ({ onClick }: Props) => {
  return (
    <div className={style["logo-container"]} onClick={onClick}>
      <div className={style.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h2 className={style.title}>LinkNash</h2>
    </div>
  )
}

export default Logo
