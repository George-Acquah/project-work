import { keys } from "@/constants/root";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  refreshToken,
} from "@/api/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store";
import { _IAuthState } from "../types";
import { authInitialState } from "../states";
import { load, remove, save } from "@/utils/functions/storage";
import { async_remove, async_save } from "@/utils/functions/async-storage";

// Define interfaces for login and register user data
interface _ILoginUserData {
  email: string;
  password: string;
}

interface _IRegisterUserData {
  email: string;
  password: string;
}

// Define login thunk action creator
export const login = createAsyncThunk(
  "auth/login",
  async (userData: _ILoginUserData) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Define refresh tokens thunk action creator
export const refreshTokens = createAsyncThunk("auth/refresh", async () => {
  try {
    const tokens = (await load<_ITokens>(
      keys.TOKEN_KEY,
      "json"
    )) as unknown as _ITokens;
    
    // Update authorization header for token refresh
    axios.defaults.headers.common[
      "Authorization"
    ] = `Refresh ${tokens.refresh_token}`;

    // Call refresh token API endpoint
    const response = await refreshToken();
    return response;
  } catch (error) {
    throw error;
  }
});

// Define register thunk action creator
export const register = createAsyncThunk(
  "auth/register",
  async (userData: _IRegisterUserData) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Define logout thunk action creator
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    // Call logout API endpoint
    const response = await logoutUser();
    // console.warn(response.message);
    console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
});

// Define update user details thunk action creator
export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (data: any) => {
    try {
      // Call update user details API endpoint
      const response = await updateUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Define the authSlice slice of the Redux state
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState, // Initial state for the auth slice
  reducers: {
    // Reducer function to clear results (currently empty)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearResults() {},
  },
  extraReducers: (builder) => {
    builder
      // Handling pending state for the login action
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
        state.isAuthenticated = false;
      })

      // Handling successful login
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authentication state
        state.isLoading = false; // Set loading state
        state.user = {
          id: action.payload.data.user._id,
          role: action.payload.data.user.userType,
        }; // Update user data
        state.exp = action.payload.data.tokens.expiresIn;

        // Update default authorization header using Axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.data.tokens.access_token}`;

        // Save updated tokens to storage
        save<_ITokens>(keys.TOKEN_KEY, action.payload.data.tokens);
        // Save expiration time to async storage
        async_save<number>(keys.EXP, action.payload.data.tokens.expiresIn);
      })

      // Handling failed login
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message as string; // Set error message
        state.isAuthenticated = false;
      })

      // Handling pending state for refreshing tokens
      .addCase(refreshTokens.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })

      // Handling successful token refresh
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authentication state
        state.isLoading = false; // Set loading state
        state.exp = action.payload.data.tokens.expiresIn;
        console.log(action.payload.data.tokens.access_token);

        // Update default authorization header using Axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.data.tokens.access_token}`;

        // Save updated tokens to storage
        save<_ITokens>(keys.TOKEN_KEY, action.payload.data.tokens);
        // Save expiration time to async storage
        async_save<number>(keys.EXP, action.payload.data.tokens.expiresIn);
      })

      // Handling failed token refresh
      .addCase(refreshTokens.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message as string; // Set error message
        state.isAuthenticated = false;
      })

      // Handling pending state for logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })

      // Handling successful logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false; // Clear authentication state
        state.isLoading = false; // Set loading state
        state.exp = 0;
        state.user = null; // Clear user data
        state.tokens = null; // Clear tokens
        state.error = null; // Clear any errors
        // Update default authorization header using Axios
        axios.defaults.headers.common[
          "Authorization"
        ] = undefined;

        // Save updated tokens to storage
        remove(keys.TOKEN_KEY);
        // Save expiration time to async storage
        async_remove(keys.EXP);
      })

      // Handling failed logout
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message as string; // Set error message
      })

      // Handling pending state for registration
      .addCase(register.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })

      // Handling successful registration
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false; // Set loading state
      })

      // Handling failed registration
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message as string; // Set error message
      })

      // Handling successful update of user details
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authentication state
        state.isLoading = false; // Set loading state
      })

      // Handling pending state for updating user details
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })

      // Handling failed update of user details
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.user = null; // Clear user data
        state.isLoading = false; // Set loading state
        state.error = action.error.message as string; // Set error message
      });
  },
});

export const { clearResults } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectTokens = (state: RootState) => state.auth.tokens;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectUser = (state: RootState) => state.auth.user;
export const selectExpiry = (state: RootState) => state.auth.exp;

// export const userSuccess = (state: RootState) => state.auth.message;

export default authSlice.reducer;
