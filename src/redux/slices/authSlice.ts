import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/lib/api/auth/services/authService';
import type { AuthState, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { STORAGE_KEYS } from '@/constants';

const initialState: AuthState & { error: string | null } = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.register(credentials);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await authService.logout();
  } finally {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth(state) {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      if (token && userStr) {
        state.token = token;
        state.user = JSON.parse(userStr);
        state.isAuthenticated = true;
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { hydrateAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
