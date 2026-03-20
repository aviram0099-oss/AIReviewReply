import { createContext, useContext, useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

const FIREBASE_ERRORS_HE = {
  'auth/email-already-in-use': 'כתובת האימייל כבר רשומה במערכת',
  'auth/invalid-email': 'כתובת אימייל לא תקינה',
  'auth/weak-password': 'הסיסמה חייבת להכיל לפחות 6 תווים',
  'auth/user-not-found': 'משתמש לא נמצא',
  'auth/wrong-password': 'סיסמה שגויה',
  'auth/invalid-credential': 'פרטי התחברות שגויים',
  'auth/too-many-requests': 'יותר מדי ניסיונות, נסו שוב מאוחר יותר',
}

function getHebrewError(error) {
  const code = error?.code || ''
  return FIREBASE_ERRORS_HE[code] || 'אירעה שגיאה, נסו שוב'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  async function register(email, password, displayName) {
    if (!auth) throw new Error('Firebase לא מוגדר')
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName })
      if (db) {
        await setDoc(doc(db, 'users', cred.user.uid), {
          email,
          displayName,
          tier: 'free',
          usage: { month: new Date().toISOString().slice(0, 7), count: 0 },
          businessProfile: { name: '', type: '', description: '' },
          preferences: { tone: 'professional', gender: 'male' },
          createdAt: new Date().toISOString(),
        })
      }
      return cred.user
    } catch (err) {
      throw new Error(getHebrewError(err))
    }
  }

  async function login(email, password) {
    if (!auth) throw new Error('Firebase לא מוגדר')
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return cred.user
    } catch (err) {
      throw new Error(getHebrewError(err))
    }
  }

  async function logout() {
    if (!auth) return
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
