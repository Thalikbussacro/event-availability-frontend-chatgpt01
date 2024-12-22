import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'
import { RegisterPage } from './pages/Register/RegisterPage'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { CreateEventPage } from './pages/CreateEvent/CreateEventPage'
import { EventDetailPage } from './pages/EventDetail/EventDetailPage'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<div style={{padding:"20px"}}><h1>Bem-vindo ao Event Availability</h1></div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEventPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default Router
