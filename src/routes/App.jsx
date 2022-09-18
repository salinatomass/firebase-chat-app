import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import '../styles/styles.scss'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useAuthContext } from '../context/AuthContext'

const App = () => {
  const { currentUser } = useAuthContext()
  console.log(currentUser)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
