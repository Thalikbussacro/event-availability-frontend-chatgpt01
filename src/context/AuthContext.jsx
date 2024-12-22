import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Antes, havia uma requisição a /auth/profile aqui
      // Agora, assumiremos que ter um token é suficiente para considerar logado.
      setUser(true) // Indica que o usuário está logado, mesmo sem perfil
    } else {
      localStorage.removeItem('jwtToken')
      setUser(null)
    }
  }, [token])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.data?.token) {
      setToken(res.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      // Não buscará mais o profile aqui.
      setUser(true) // Apenas indica que o usuário está logado
    } else {
      throw new Error('Token não retornado')
    }
  }

  const register = async (username, email, password) => {
    await api.post('/auth/register', { username, email, password })
  }

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('jwtToken')
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
