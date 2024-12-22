import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import styles from './Navbar.module.css'

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <>
          <Link to="/login">Entrar</Link>
          <Link to="/register">Registrar</Link>
        </>
      )}
    </nav>
  )
}
