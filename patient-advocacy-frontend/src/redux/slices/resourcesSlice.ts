import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'document' | 'website';
  url: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  rating: number;
  views: number;
}

interface ResourcesState {
  items: Resource[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    type: string;
    search: string;
  };
  categories: string[];
}

const initialState: ResourcesState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    type: '',
    search: '',
  },
  categories: [],
};

export const fetchResources = createAsyncThunk(
  'resources/fetch',
  async () => {
    // TODO: Implement actual API call
    return [];
  }
);

export const fetchCategories = createAsyncThunk(
  'resources/fetchCategories',
  async () => {
    // TODO: Implement actual API call
    return [];
  }
);

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resources';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { setFilters, resetFilters } = resourcesSlice.actions;
export default resourcesSlice.reducer;
