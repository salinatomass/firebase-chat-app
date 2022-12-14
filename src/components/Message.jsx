import { useEffect, useRef } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const { currentUser } = useAuthContext()
  const { data } = useChatContext()

  const messageIsMine = message.senderId === currentUser.uid

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div ref={ref} className={`message ${messageIsMine && 'owner'}`}>
      <div className="messageInfo">
        <img
          src={messageIsMine ? currentUser.photoURL : data.user.photoURL}
          alt={messageIsMine ? currentUser.displayName : data.user.displayName}
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message
