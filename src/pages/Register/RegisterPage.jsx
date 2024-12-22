import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './RegisterPage.module.css'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      alert('Usuário registrado com sucesso!')
      navigate('/login')
    } catch (error) {
      console.error("Erro ao registrar usuário:", error)
      alert('Erro ao registrar usuário')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Registrar</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={e=>setUsername(e.target.value)} 
          type="text" 
          required 
        />
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}
