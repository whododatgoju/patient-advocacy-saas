import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login, logout } from './store/authSlice.ts'
import userReducer from './store/userSlice.ts'

// Create store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
})

// Export action creators
export { login, logout }

// Export store types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
