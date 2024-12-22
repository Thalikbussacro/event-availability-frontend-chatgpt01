import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import styles from './DashboardPage.module.css'

export const DashboardPage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events')
        setEvents(res.data)
      } catch (error) {
        console.error("Erro ao buscar eventos:", error)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Meus Eventos</h1>
      <Link to="/create-event">Criar Novo Evento</Link>
      <ul className={styles.eventList}>
        {events.map(evt => (
          <li key={evt.id}>
            <Link to={`/events/${evt.id}`}>{evt.name} - {evt.date}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
