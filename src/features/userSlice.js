import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const AUTH_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/auth`;
// console.log(AUTH_ENDPOINT, 'auth pointer');

const initialState = {
    status: "",
    error: "",
    user: JSON.parse(localStorage.getItem('user')) || {  // Get user data from localStorage if available
        id: "",
        name: "",
        email: "",
        image: "",
        status: "",
        token: "",
    }
};

export const registerUser = createAsyncThunk(
    "auth/register", async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/registration`, { ...values });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login", async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, { ...values });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {  // Clear user data from both state and localStorage
                id: "",
                name: "",
                email: "",
                image: "",
                status: "",
                token: "",
            };
            localStorage.removeItem('user');  // Remove user data from localStorage
        }
    },
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state) => {
            state.status = "loading";
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                // Persist user data in localStorage after registration
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                // Persist user data in localStorage after login
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
