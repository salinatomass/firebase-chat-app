import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'

const Chats = () => {
  const { currentUser } = useAuthContext()
  const { dispatch } = useChatContext()
  const [chats, setChats] = useState([])

  const handleSelect = userInfo => {
    dispatch({ type: 'CHANGE_USER', payload: userInfo })
  }

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
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
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
