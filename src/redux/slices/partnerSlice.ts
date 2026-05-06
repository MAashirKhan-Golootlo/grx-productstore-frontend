import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { partnerService } from '@/lib/api/partners/services/partnerService';
import { CreatePartnerDto, Partner, UpdatePartnerDto } from '@/types/partner';

interface PartnerState {
  items: Partner[];
  selected: Partner | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchPartners = createAsyncThunk(
  'partners/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await partnerService.getAll();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch partners');
    }
  }
);

export const fetchPartnerById = createAsyncThunk(
  'partners/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await partnerService.getById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch partner');
    }
  }
);

export const createPartner = createAsyncThunk(
  'partners/create',
  async (data: CreatePartnerDto, { rejectWithValue }) => {
    try {
      return await partnerService.create(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create partner');
    }
  }
);

export const updatePartner = createAsyncThunk(
  'partners/update',
  async ({ id, data }: { id: string; data: UpdatePartnerDto }, { rejectWithValue }) => {
    try {
      return await partnerService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update partner');
    }
  }
);

const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPartnerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPartnerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      });
  },
});

export default partnerSlice.reducer;
