import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useAuthContext()

  return (
    <div className="navbar">
      <span className="logo">Chat app</span>
      <div className="user">
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
