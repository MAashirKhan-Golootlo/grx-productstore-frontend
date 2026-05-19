import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '@/lib/api/orders/services/orderService';
import type { PaginatedResponse } from '@/types/common';
import { CreateOrderDto, ListOrdersParams, Order, OrderStatus } from '@/types/order';

interface OrderState {
  items: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  listParams: ListOrdersParams;
  selected: Order | null;
  isLoading: boolean;
  isExporting: boolean;
  isSubmitting: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  listParams: { page: 1, limit: 20 },
  selected: null,
  isLoading: false,
  isExporting: false,
  isSubmitting: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchPaginated',
  async (params: ListOrdersParams | undefined, { rejectWithValue }) => {
    try {
      return await orderService.getPaginated(params);
    } catch (error: unknown) {
      const message =
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
          ? String(error.response.data.message)
          : 'Failed to fetch orders';
      return rejectWithValue(message);
    }
  },
);

export const exportOrdersCsv = createAsyncThunk(
  'orders/exportCsv',
  async (
    params: Pick<ListOrdersParams, 'tenantId' | 'partnerId' | 'orderNo'> | undefined,
    { rejectWithValue },
  ) => {
    try {
      await orderService.exportCsv(params);
    } catch (error: unknown) {
      const message =
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
          ? String(error.response.data.message)
          : 'Failed to export orders';
      return rejectWithValue(message);
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await orderService.getById(id);
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch order');
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: string; status: OrderStatus }, { rejectWithValue }) => {
    try {
      return await orderService.updateStatus(id, status);
    } catch (error: unknown) {
      return rejectWithValue('Failed to update order status');
    }
  },
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (data: CreateOrderDto, { rejectWithValue }) => {
    try {
      return await orderService.create(data);
    } catch (error: unknown) {
      return rejectWithValue('Failed to create order');
    }
  },
);

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
    setListParams: (state, action: { payload: ListOrdersParams }) => {
      state.listParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: { payload: PaginatedResponse<Order> }) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(exportOrdersCsv.pending, (state) => {
        state.isExporting = true;
        state.error = null;
      })
      .addCase(exportOrdersCsv.fulfilled, (state) => {
        state.isExporting = false;
      })
      .addCase(exportOrdersCsv.rejected, (state, action) => {
        state.isExporting = false;
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
      .addCase(createOrder.fulfilled, (state) => {
        state.isSubmitting = false;
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

export const { clearOrderError, setSelectedOrder, setListParams } = orderSlice.actions;
export default orderSlice.reducer;
