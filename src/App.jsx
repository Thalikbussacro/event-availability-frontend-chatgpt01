import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/Navbar/Navbar'
import Router from './router'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
