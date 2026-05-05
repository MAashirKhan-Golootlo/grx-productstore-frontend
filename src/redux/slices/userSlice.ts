import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/lib/api/users/services/userService';
import { ManagedUser, CreateUserDto, UpdateUserDto } from '@/types/user';

interface UserState {
  items: ManagedUser[];
  selected: ManagedUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await userService.getAll();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

export const fetchUserById = createAsyncThunk('users/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    return await userService.getById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const createUser = createAsyncThunk('users/create', async (data: CreateUserDto, { rejectWithValue }) => {
  try {
    return await userService.create(data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create user');
  }
});

export const updateUser = createAsyncThunk('users/update', async ({ id, data }: { id: string; data: UpdateUserDto }, { rejectWithValue }) => {
  try {
    return await userService.update(id, data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update user');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    setSelectedUser: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
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

export const { clearUserError, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
