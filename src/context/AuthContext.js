import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })

    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
