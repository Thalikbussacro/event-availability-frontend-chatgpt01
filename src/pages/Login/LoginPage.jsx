import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      console.log("Login realizado, navegando para /create-event")
      navigate('/create-event')
    } catch (err) {
      console.error("Erro ao fazer login:", err)
      alert('Erro ao fazer login')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          type="email" 
          required 
        />
        <input 
          placeholder="Senha" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          type="password" 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
