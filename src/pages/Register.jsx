import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

import AddAvatarImg from '../img/addAvatar.png'

const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      // Uploading an image file
      const storageRef = ref(storage, displayName) // John.png for example
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            setErr(false)
            navigate('/')
          })
        }
      )
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" required />
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <input style={{ display: 'none' }} type="file" id="file" required />
          <label htmlFor="file">
            <img src={AddAvatarImg} alt="Add avatar icon" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
