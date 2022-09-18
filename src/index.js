import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './context/AuthContext'
import App from './routes/App'

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
