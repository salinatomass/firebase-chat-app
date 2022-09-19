import { useState } from 'react'
import AttachIcon from '../img/attach.png'
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'

import ImgIcon from '../img/img.png'

const Input = () => {
  const { currentUser } = useAuthContext()
  const { data } = useChatContext()

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuidv4())
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          })
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    })
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    })

    setText('')
    setImage(null)
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="send">
        <img src={AttachIcon} alt="" />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={ImgIcon} alt="" />
        </label>
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Input
