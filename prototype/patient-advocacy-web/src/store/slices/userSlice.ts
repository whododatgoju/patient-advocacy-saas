import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
  id: string
  name: string
  email: string
  preferredLanguage: string
  readingLevel: 'standard' | 'simplified' | 'basic'
  accessibility: {
    screenReader: boolean
    highContrast: boolean
    largeText: boolean
  }
}

interface PatientProfile extends UserProfile {
  medicalHistory: string[]
  currentMedications: string[]
  insuranceDetails: {
    provider: string
    policyNumber: string
    coverage: string
  }
  communicationPreferences: {
    method: 'email' | 'sms' | 'call'
    frequency: 'daily' | 'weekly' | 'asNeeded'
  }
}

interface AdvocateProfile extends UserProfile {
  specializations: string[]
  languages: string[]
  availability: {
    days: string[]
    times: string[]
  }
  experience: number
  certifications: string[]
}

interface ProviderProfile extends UserProfile {
  specialty: string
  facility: string
  npi: string
  patients: string[]
}

type ProfileType = PatientProfile | AdvocateProfile | ProviderProfile | null

interface UserState {
  profile: ProfileType
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearProfile: (state) => {
      state.profile = null;
    }
  },
})

export const { 
  fetchProfileStart, 
  fetchProfileSuccess, 
  fetchProfileFailure, 
  updateProfile,
  clearProfile
} = userSlice.actions

export default userSlice.reducer
