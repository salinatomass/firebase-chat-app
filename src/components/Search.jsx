import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const Search = () => {
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

  return (
    <div className="search">
      <div className="searchForm">
        <input
          placeholder="find a user"
          type="text"
          onChange={e =>
            setSearch(prev => ({ ...prev, query: e.target.value }))
          }
          onKeyDown={handleKey}
        />
      </div>
      {search.err && <span>User not found</span>}
      {search.user && (
        <div className="userChat">
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
