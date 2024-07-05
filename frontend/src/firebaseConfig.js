import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDmlKyF6ggbz51HkOGHD4xTHsDYy_0Xz-E',
  authDomain: 'arenatalent-d7a88.firebaseapp.com',
  projectId: 'arenatalent-d7a88',
  storageBucket: 'arenatalent-d7a88.appspot.com',
  messagingSenderId: '399446937716',
  appId: '1:399446937716:web:b0fcce76cef186ef2a4121',
  measurementId: 'G-K1LG2T2264'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
