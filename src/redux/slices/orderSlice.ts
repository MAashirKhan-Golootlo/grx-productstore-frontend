import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '@/lib/api/orders/services/orderService';
import { CreateOrderDto, Order, OrderStatus } from '@/types/order';

interface OrderState {
  items: Order[];
  selected: Order | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  selected: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await orderService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    return await orderService.getById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }: { id: string; status: OrderStatus }, { rejectWithValue }) => {
  try {
    return await orderService.updateStatus(id, status);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
  }
});

export const createOrder = createAsyncThunk('orders/create', async (data: CreateOrderDto, { rejectWithValue }) => {
  try {
    return await orderService.create(data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create order');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    setSelectedOrder: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.items.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
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

export const { clearOrderError, setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
