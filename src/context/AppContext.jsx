import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc, where } from 'firebase/firestore'
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

  async function syncGoogleReviews() {
    if (!user || !db) return []
    try {
      const res = await fetch('/.netlify/functions/google-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'שגיאה בסנכרון ביקורות')
      }

      const data = await res.json()
      const googleReviews = data.reviews || []
      const { accountId, locationId } = data

      // Get existing reviews to check for duplicates
      const existingReviews = reviews.filter((r) => r.googleReviewId)
      const existingGoogleIds = new Set(existingReviews.map((r) => r.googleReviewId))

      const newReviews = []
      for (const gr of googleReviews) {
        if (existingGoogleIds.has(gr.reviewId)) continue

        // Convert star rating
        const ratingMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }
        const rating = ratingMap[gr.starRating] || 5

        const reviewData = {
          reviewerName: gr.reviewer.displayName,
          reviewText: gr.comment || '(ללא טקסט)',
          rating,
          response: gr.reviewReply?.comment || '',
          googleReviewId: gr.reviewId,
          googleAccountId: accountId,
          googleLocationId: locationId,
          source: 'google',
          publishedToGoogle: !!gr.reviewReply,
          createdAt: gr.createTime || new Date().toISOString(),
        }

        const docRef = await addDoc(collection(db, 'users', user.uid, 'reviews'), reviewData)
        newReviews.push({ id: docRef.id, ...reviewData })
      }

      if (newReviews.length > 0) {
        setReviews((prev) => [...newReviews, ...prev])
      }

      return newReviews
    } catch (err) {
      console.error('Sync Google reviews error:', err)
      throw err
    }
  }

  async function publishReply(reviewId, reviewData) {
    if (!user || !db) return
    try {
      const res = await fetch('/.netlify/functions/google-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          accountId: reviewData.googleAccountId,
          locationId: reviewData.googleLocationId,
          reviewId: reviewData.googleReviewId,
          comment: reviewData.response,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'שגיאה בפרסום התגובה')
      }

      await updateReview(reviewId, { publishedToGoogle: true })
      return true
    } catch (err) {
      console.error('Publish reply error:', err)
      throw err
    }
  }

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
        syncGoogleReviews,
        publishReply,
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
