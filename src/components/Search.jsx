import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

const Search = () => {
  const { currentUser } = useAuthContext()
  const [search, setSearch] = useState({
    query: '',
    user: null,
    err: false,
  })

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', search.query)
    )

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        setSearch(prev => ({ ...prev, user: doc.data(), err: false }))
      })
    } catch (err) {
      setSearch(prev => ({ ...prev, err: true }))
    }
  }

  const handleKey = e => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async e => {
    // check wheter the group (chats in firestore) exists, is not create one
    const combinedId =
      currentUser.uid > search.user.uid
        ? currentUser.uid + search.user.uid
        : search.user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        // create both userChats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: search.user.uid,
            displayName: search.user.displayName,
            photoURL: search.user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
        await updateDoc(doc(db, 'userChats', search.user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      console.log(err)
    }

    setSearch(prev => ({ ...prev, user: null, query: '' }))
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          placeholder="find a user"
          type="text"
          value={search.query}
          onChange={e =>
            setSearch(prev => ({ ...prev, query: e.target.value }))
          }
          onKeyDown={handleKey}
        />
      </div>
      {search.err && <span>User not found</span>}
      {search.user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={search.user.photoURL} alt={search.user.displayName} />
          <div className="userChatInfo">
            <span>{search.user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
