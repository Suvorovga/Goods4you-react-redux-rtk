import { Link } from 'react-router-dom'

import styles from './footer.module.css'

import { Logo } from 'src/components/Logo/Logo'
import { Menu } from 'src/components/Menu/Menu'
import { useAppSelector } from 'src/hooks/redux'

export const Footer = () => {
  // Отображение футера в зависимости от авторизации пользователя
  const userId = useAppSelector(state => state.user.id)

  if (userId > 0)
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <Link className={styles.link} to={"/"}>
          <Logo />
        </Link>
        <Menu type='footer' />
      </div>
    </footer>
  )

  return null
}
