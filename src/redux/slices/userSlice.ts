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

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
