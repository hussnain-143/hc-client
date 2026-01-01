
import './App.css'
import RoutesConfig from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <AuthProvider>
      <RoutesConfig/>
    </AuthProvider>
  )
}

export default App
