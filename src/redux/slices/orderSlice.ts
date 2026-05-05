import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '@/lib/api/orders/services/orderService';
import { Order, OrderStatus } from '@/types/order';

interface OrderState {
  items: Order[];
  selected: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await orderService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
