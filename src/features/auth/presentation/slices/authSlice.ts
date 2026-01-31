import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthCredentials, SignUpData } from '../../domain/entities/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isInitialized: false,
};

// Mock authentication - replace with real API calls later
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          avatar: 'https://via.placeholder.com/100/4CAF50/FFFFFF?text=DU',
        };
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (signUpData: SignUpData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      if (signUpData.password !== signUpData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (signUpData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const user: User = {
        id: Date.now().toString(),
        email: signUpData.email,
        name: signUpData.name,
        avatar: `https://via.placeholder.com/100/2196F3/FFFFFF?text=${signUpData.name.charAt(0).toUpperCase()}`,
      };
      
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign up failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setInitialized, resetAuth } = authSlice.actions;
export default authSlice.reducer;