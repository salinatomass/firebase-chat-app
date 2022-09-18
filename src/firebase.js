import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCmubhqyKRgkLNchN0mfdJXnlIpKHz9VVo',
  authDomain: 'chat-57152.firebaseapp.com',
  projectId: 'chat-57152',
  storageBucket: 'chat-57152.appspot.com',
  messagingSenderId: '158433213908',
  appId: '1:158433213908:web:03868fcbe4bd31fa016a41',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
