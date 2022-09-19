import { useState, useEffect } from 'react'
import { useChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

import Message from './Message'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useChatContext()

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
        doc.exists() && setMessages(doc.data().messages)
      })
      return () => unsub()
    }

    data.chatId && getMessages()
  }, [data.chatId])

  return (
    <div className="messages">
      {messages.map(m => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
