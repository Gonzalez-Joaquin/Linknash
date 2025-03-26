import { useState } from 'react'
import Assets from './Assets'
import styles from './User.module.css'

interface Props {
  name: string
  size?: 'small' | 'medium' | 'medium + info'
  image?: string
  info?: string
}

const User = ({ name, info, image, size = 'medium' }: Props) => {
  const [error, setError] = useState(false)

  return (
    <div className={styles.container}>
      {size !== 'small' && (
        <div className={styles.information}>
          <span className={styles.name}>{name}</span>
          {size === 'medium + info' && info && (
            <p className={styles.info}>{info}</p>
          )}
        </div>
      )}
      <div className={styles['profile-pic']}>
        {error || !image ? (
          Assets.user
        ) : (
          <img
            src={image}
            onError={() => setError(true)}
            alt={`profile-pic-${name}`}
          />
        )}
      </div>
    </div>
  )
}

export default User
