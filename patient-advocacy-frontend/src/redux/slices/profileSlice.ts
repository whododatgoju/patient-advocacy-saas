import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../types/user';

interface ProfileState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
  preferences: {
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
    };
    accessibility: {
      highContrast: boolean;
      fontSize: 'small' | 'medium' | 'large';
    };
  };
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
    },
    accessibility: {
      highContrast: false,
      fontSize: 'medium',
    },
  },
};

export const loadProfile = createAsyncThunk(
  'profile/load',
  async () => {
    // TODO: Implement actual API call
    return null;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (updates: Partial<UserData>) => {
    // TODO: Implement actual API call
    return updates;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updatePreferences: (state, action) => {
      state.preferences = action.payload;
    },
    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data = { ...state.data, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export const { updatePreferences, resetPreferences } = profileSlice.actions;
export default profileSlice.reducer;
