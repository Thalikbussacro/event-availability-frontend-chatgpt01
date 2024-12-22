import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import styles from './EventDetailPage.module.css'
import { AuthContext } from '../../context/AuthContext'

export const EventDetailPage = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [event, setEvent] = useState(null)
  const [availabilities, setAvailabilities] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [startTime, setStartTime]   = useState('')
  const [endTime, setEndTime]       = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/events/${id}`)
        setEvent(res.data)
        const avRes = await api.get(`/availability/${id}`)
        setAvailabilities(avRes.data)
      } catch (error) {
        console.error("Erro ao carregar evento ou disponibilidades:", error)
      }
    }
    fetchData()
  }, [id])

  const handleAvailability = async (e) => {
    e.preventDefault()
    try {
      await api.post('/availability', {
        eventId: id,
        day: selectedDay || event?.date,
        startTime,
        endTime
      })
      alert('Disponibilidade registrada com sucesso!')
      const avRes = await api.get(`/availability/${id}`)
      setAvailabilities(avRes.data)
    } catch (error) {
      console.error("Erro ao registrar disponibilidade:", error)
      alert('Erro ao registrar disponibilidade')
    }
  }

  return (
    <div className={styles.container}>
      {event ? (
        <>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          <p>Data: {event.date} | {event.startTime} - {event.endTime}</p>

          {user && (
            <div className={styles.availabilityForm}>
              <h2>Indicar Disponibilidade</h2>
              <form onSubmit={handleAvailability}>
                <input 
                  type="date" 
                  value={selectedDay || event.date} 
                  onChange={e=>setSelectedDay(e.target.value)} 
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
                <button type="submit">Salvar</button>
              </form>
            </div>
          )}

          <h2>Disponibilidades Registradas</h2>
          <ul>
            {availabilities.map((a,i) => (
              <li key={i}>{a.username} - {a.day} {a.startTime} - {a.endTime}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Carregando evento...</p>
      )}
    </div>
  )
}
