import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

const Chats = () => {
  const { currentUser } = useAuthContext()
  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        setChats(doc.data())
      })

      return () => unsub()
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  return (
    <div className="chats">
      {Object.entries(chats)?.map(chat => (
        <div className="userChat" key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt={chat[1].displayName} />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats
