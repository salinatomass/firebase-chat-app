import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '../styles/styles.scss'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
