import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '@/lib/api/products/services/productService';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

interface ProductState {
  items: Product[];
  selected: Product | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await productService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
