import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define user role type
export type UserRole = 'patient' | 'advocate' | 'provider' | null

// Define authentication state
interface AuthState {
  isAuthenticated: boolean
  userRole: UserRole
  userId: string | null
  userInfo: {
    name: string | null
    email: string | null
  }
}

// Initial authentication state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  userId: null,
  userInfo: {
    name: null,
    email: null
  }
}

// Create authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<{ 
      userRole: UserRole, 
      userId: string, 
      name: string, 
      email: string 
    }>) => {
      state.isAuthenticated = true
      state.userRole = action.payload.userRole
      state.userId = action.payload.userId
      state.userInfo.name = action.payload.name
      state.userInfo.email = action.payload.email
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userRole = null
      state.userId = null
      state.userInfo.name = null
      state.userInfo.email = null
    }
  }
})

// Export action creators
export const { login, logout } = authSlice.actions

// Export reducer
export default authSlice.reducer
