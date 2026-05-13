import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/lib/api/auth/services/authService';
import type {
  AuthState,
  AuthTokenResponse,
  LoginCredentials,
  RegisterCredentials,
} from '@/types/auth';
import { STORAGE_KEYS } from '@/constants';

const SESSION_COOKIE_KEY = 'session_token';
const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 1 day

const setSessionCookie = (token: string): void => {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${SESSION_COOKIE_KEY}=${encodeURIComponent(token)}; path=/; max-age=${SESSION_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

const clearSessionCookie = (): void => {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${SESSION_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
};

const initialState: AuthState & { error: string | null; isHydrated: boolean } = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
      setSessionCookie(response.accessToken);
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
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
      setSessionCookie(response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  clearSessionCookie();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth(state) {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      if (token) {
        state.token = token;
        state.user = userStr ? JSON.parse(userStr) : null;
        state.isAuthenticated = true;
        setSessionCookie(token);
      } else {
        // Stale cookie but no localStorage token — clear the cookie so
        // middleware stops redirecting /login → / and breaking the auth loop.
        clearSessionCookie();
      }
      state.isHydrated = true;
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
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthTokenResponse>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = null;
        state.token = action.payload.accessToken;
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
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthTokenResponse>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = null;
        state.token = action.payload.accessToken;
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
