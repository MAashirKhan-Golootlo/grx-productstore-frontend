import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tenantService } from '@/lib/api/tenants/services/tenantService';
import {
  CreateTenantDto,
  CreateTenantResponse,
  Tenant,
  UpdateTenantDto,
} from '@/types/tenant';

interface TenantState {
  items: Tenant[];
  selected: Tenant | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TenantState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchTenants = createAsyncThunk(
  'tenants/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await tenantService.getAll();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tenants');
    }
  }
);

export const fetchTenantById = createAsyncThunk(
  'tenants/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await tenantService.getById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tenant');
    }
  }
);

export const createTenant = createAsyncThunk(
  'tenants/create',
  async (data: CreateTenantDto, { rejectWithValue }): Promise<CreateTenantResponse | any> => {
    try {
      return await tenantService.create(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create tenant');
    }
  }
);

export const updateTenant = createAsyncThunk(
  'tenants/update',
  async ({ id, data }: { id: number; data: UpdateTenantDto }, { rejectWithValue }) => {
    try {
      return await tenantService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update tenant');
    }
  }
);

const tenantSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTenantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTenantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchTenantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.items.push(action.payload.tenant);
      })
      .addCase(updateTenant.fulfilled, (state, action) => {
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

export default tenantSlice.reducer;
