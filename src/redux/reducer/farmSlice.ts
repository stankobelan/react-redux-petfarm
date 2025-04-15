import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IFarm } from '../../share/interfaces/IFarm';
import axios from '../../axios-inst';

/**
 * State interface for the farms slice
 */
export interface FarmSliceState {
  current: number;
  farms: IFarm[];
  loading: boolean;
  error: string | null;
}

const initialState: FarmSliceState = {
  current: 0,
  farms: [],
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching farms from API
 */
export const fetchFarms = createAsyncThunk('farms/fetchFarms', async (_, { rejectWithValue }) => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get('/farms');
    return response.data as IFarm[];
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch farms');
  }
});

/**
 * Async thunk for adding a new farm
 */
export const addNewFarm = createAsyncThunk(
  'farms/addNewFarm',
  async (farm: Omit<IFarm, 'id'>, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/farms', farm);
      return response.data as IFarm;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add farm');
    }
  }
);

/**
 * Farm slice with reducers and actions
 */
const farmSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {
    addFarm(state, action: PayloadAction<IFarm>) {
      state.farms.push(action.payload);
    },
    editFarm(state, action: PayloadAction<IFarm>) {
      const editFarm = state.farms.find(item => item.id === action.payload.id);
      if (editFarm) {
        editFarm.address = action.payload.address;
        editFarm.name = action.payload.name;
      }
    },
    removeFarm(state, action: PayloadAction<IFarm>) {
      state.farms = state.farms.filter(item => item.id !== action.payload.id);
    },
    initFarms(state, action: PayloadAction<IFarm[]>) {
      state.farms = action.payload;
    },
    setCurrentFarm(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch farms reducers
      .addCase(fetchFarms.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarms.fulfilled, (state, action) => {
        state.loading = false;
        state.farms = action.payload;
      })
      .addCase(fetchFarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add new farm reducers
      .addCase(addNewFarm.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewFarm.fulfilled, (state, action) => {
        state.loading = false;
        state.farms.push(action.payload);
      })
      .addCase(addNewFarm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions from the slice
export const { addFarm, editFarm, initFarms, removeFarm, setCurrentFarm } = farmSlice.actions;

// Export the reducer
export default farmSlice.reducer;
