import { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import styles from './CreateEventPage.module.css'

export const CreateEventPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/events', {
        name, description, date, startTime, endTime
      })
      alert('Evento criado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      console.error("Erro ao criar evento:", error)
      alert('Erro ao criar evento')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Criar Evento</h1>
      <form onSubmit={handleCreate} className={styles.form}>
        <input
          type="text"
          placeholder="Nome do evento"
          value={name}
          onChange={e=>setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={e=>setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={e=>setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={startTime}
          onChange={e=>setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          value={endTime}
          onChange={e=>setEndTime(e.target.value)}
          required
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}
