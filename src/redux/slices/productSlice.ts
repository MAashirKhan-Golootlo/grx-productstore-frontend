import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '@/lib/api/products/services/productService';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

interface ProductState {
  items: Product[];
  selected: Product | null;
  isListLoading: boolean;
  isFormSubmitting: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selected: null,
  isListLoading: false,
  isFormSubmitting: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await productService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    return await productService.getById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
  }
});

export const createProduct = createAsyncThunk('products/create', async (data: CreateProductDto, { rejectWithValue }) => {
  try {
    return await productService.create(data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create product');
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }: { id: string; data: UpdateProductDto }, { rejectWithValue }) => {
  try {
    return await productService.update(id, data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isListLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isListLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isListLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isListLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.isFormSubmitting = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isFormSubmitting = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductError, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
