import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { partnerProductService } from '@/lib/api/partner-products/services/partnerProductService';
import {
  CreatePartnerProductDto,
  PartnerProduct,
  UpdatePartnerProductDto,
} from '@/types/partner-product';

interface PartnerProductState {
  items: PartnerProduct[];
  selected: PartnerProduct | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerProductState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchPartnerProducts = createAsyncThunk(
  'partnerProducts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await partnerProductService.getAll();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch partner products'
      );
    }
  }
);

export const fetchPartnerProductById = createAsyncThunk(
  'partnerProducts/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await partnerProductService.getById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch partner product'
      );
    }
  }
);

export const createPartnerProduct = createAsyncThunk(
  'partnerProducts/create',
  async (data: CreatePartnerProductDto, { rejectWithValue }) => {
    try {
      return await partnerProductService.create(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create partner product'
      );
    }
  }
);

export const updatePartnerProduct = createAsyncThunk(
  'partnerProducts/update',
  async (
    { id, data }: { id: string; data: UpdatePartnerProductDto },
    { rejectWithValue }
  ) => {
    try {
      return await partnerProductService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update partner product'
      );
    }
  }
);

const partnerProductSlice = createSlice({
  name: 'partnerProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnerProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartnerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPartnerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPartnerProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartnerProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPartnerProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createPartnerProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePartnerProduct.fulfilled, (state, action) => {
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

export default partnerProductSlice.reducer;
