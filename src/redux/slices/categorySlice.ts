import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '@/lib/api/categories/services/categoryService';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';

interface CategoryState {
  items: Category[];
  selected: Category | null;
  isListLoading: boolean;
  isFormSubmitting: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  items: [],
  selected: null,
  isListLoading: false,
  isFormSubmitting: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await categoryService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
  }
});

export const fetchCategoryById = createAsyncThunk('categories/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    return await categoryService.getById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
  }
});

export const createCategory = createAsyncThunk('categories/create', async (data: CreateCategoryDto, { rejectWithValue }) => {
  try {
    return await categoryService.create(data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create category');
  }
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, data }: { id: string; data: UpdateCategoryDto }, { rejectWithValue }) => {
  try {
    return await categoryService.update(id, data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update category');
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
        state.isListLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isListLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.isListLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isListLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.isFormSubmitting = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.items.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isFormSubmitting = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategoryError, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
