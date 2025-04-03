import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define user profile type
interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    dataSharing: boolean
  }
  // Patient-specific fields
  medicalConditions?: string[]
  medications?: string[]
  insuranceProvider?: string
  // Advocate-specific fields
  specialization?: string
  yearsOfExperience?: number
  languages?: string[]
  // Provider-specific fields
  organization?: string
  specialty?: string
  npi?: string
}

// Define user state
interface UserState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

// Initial user state
const initialUserState: UserState = {
  profile: null,
  loading: false,
  error: null
}

// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
      state.loading = false
      state.error = null
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

// Export action creators
export const { 
  setUserProfile, 
  updateUserProfile, 
  setLoading, 
  setError, 
  clearError 
} = userSlice.actions

// Export reducer
export default userSlice.reducer
