import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '@/lib/api/categories/services/categoryService';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';

interface CategoryState {
  items: Category[];
  selected: Category | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await categoryService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
  }
});

export const createCategory = createAsyncThunk('categories/create', async (data: CreateCategoryDto, { rejectWithValue }) => {
  try {
    return await categoryService.create(data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create category');
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { clearCategoryError, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
