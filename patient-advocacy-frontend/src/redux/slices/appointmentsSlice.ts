import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from '../../types/appointment';

interface AppointmentsState {
  upcoming: Appointment[];
  past: Appointment[];
  loading: boolean;
  error: string | null;
  selectedAppointment: Appointment | null;
  showDetailsModal: boolean;
  showAddModal: boolean;
  activeTab: 'upcoming' | 'past';
  showCancelConfirm: boolean;
}

const initialState: AppointmentsState = {
  upcoming: [],
  past: [],
  loading: false,
  error: null,
  selectedAppointment: null,
  showDetailsModal: false,
  showAddModal: false,
  activeTab: 'upcoming',
  showCancelConfirm: false,
};

export const fetchAppointments = createAsyncThunk(
  'appointments/fetch',
  async () => {
    // TODO: Implement actual API call
    return { upcoming: [], past: [] };
  }
);

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    setShowDetailsModal: (state, action) => {
      state.showDetailsModal = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setShowCancelConfirm: (state, action) => {
      state.showCancelConfirm = action.payload;
    },
    addAppointment: (state, action) => {
      state.upcoming.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.upcoming.findIndex(app => app.id === id);
      if (index !== -1) {
        state.upcoming[index] = { ...state.upcoming[index], ...updates };
      }
    },
    cancelAppointment: (state, action) => {
      const index = state.upcoming.findIndex(app => app.id === action.payload);
      if (index !== -1) {
        state.past.push(state.upcoming[index]);
        state.upcoming.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload.upcoming;
        state.past = action.payload.past;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch appointments';
      });
  },
});

export const {
  setSelectedAppointment,
  setShowDetailsModal,
  setShowAddModal,
  setActiveTab,
  setShowCancelConfirm,
  addAppointment,
  updateAppointment,
  cancelAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
