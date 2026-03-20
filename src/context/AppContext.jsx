import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const AppContext = createContext(null)

const TIER_LIMITS = {
  free: 3,
  starter: 50,
  growth: 200,
}

export function AppProvider({ children }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [reviews, setReviews] = useState([])
  const [toast, setToast] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(false)

  // Load user profile from Firestore
  useEffect(() => {
    if (!user || !db) {
      setProfile(null)
      setReviews([])
      return
    }
    loadProfile()
    loadReviews()
  }, [user])

  async function loadProfile() {
    setLoadingProfile(true)
    try {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        setProfile(snap.data())
      }
    } catch (err) {
      console.error('Error loading profile:', err)
    }
    setLoadingProfile(false)
  }

  async function loadReviews() {
    try {
      const q = query(collection(db, 'users', user.uid, 'reviews'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Error loading reviews:', err)
    }
  }

  async function updateProfile(data) {
    if (!user || !db) return
    await updateDoc(doc(db, 'users', user.uid), data)
    setProfile((prev) => ({ ...prev, ...data }))
    showToast('הפרופיל עודכן בהצלחה', 'success')
  }

  async function addReview(review) {
    if (!user || !db) return
    const docRef = await addDoc(collection(db, 'users', user.uid, 'reviews'), {
      ...review,
      createdAt: new Date().toISOString(),
    })
    const newReview = { id: docRef.id, ...review, createdAt: new Date().toISOString() }
    setReviews((prev) => [newReview, ...prev])
    return newReview
  }

  async function updateReview(reviewId, data) {
    if (!user || !db) return
    await updateDoc(doc(db, 'users', user.uid, 'reviews', reviewId), data)
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, ...data } : r)))
  }

  async function deleteReview(reviewId) {
    if (!user || !db) return
    await deleteDoc(doc(db, 'users', user.uid, 'reviews', reviewId))
    setReviews((prev) => prev.filter((r) => r.id !== reviewId))
    showToast('הביקורת נמחקה', 'success')
  }

  async function incrementUsage() {
    if (!user || !db || !profile) return false
    const currentMonth = new Date().toISOString().slice(0, 7)
    const usage = profile.usage || { month: currentMonth, count: 0 }

    // Reset if new month
    if (usage.month !== currentMonth) {
      usage.month = currentMonth
      usage.count = 0
    }

    const limit = TIER_LIMITS[profile.tier] || TIER_LIMITS.free
    if (usage.count >= limit) {
      return false // over limit
    }

    usage.count += 1
    await updateDoc(doc(db, 'users', user.uid), { usage })
    setProfile((prev) => ({ ...prev, usage }))
    return true
  }

  function getUsageInfo() {
    if (!profile) return { used: 0, limit: 3, tier: 'free' }
    const currentMonth = new Date().toISOString().slice(0, 7)
    const usage = profile.usage || { month: currentMonth, count: 0 }
    const count = usage.month === currentMonth ? usage.count : 0
    const limit = TIER_LIMITS[profile.tier] || TIER_LIMITS.free
    return { used: count, limit, tier: profile.tier || 'free' }
  }

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return (
    <AppContext.Provider
      value={{
        profile,
        loadingProfile,
        reviews,
        updateProfile,
        addReview,
        updateReview,
        deleteReview,
        incrementUsage,
        getUsageInfo,
        loadReviews,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
