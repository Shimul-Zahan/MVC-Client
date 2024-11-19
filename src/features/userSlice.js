import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`

const initialState = {
    status: "",
    error: "",
    user: {
        id: "",
        name: "",
        email: "",
        image: "",
        status: "",
        token: "",
    }
}

export const registerUser = createAsyncThunk(
    "auth/register", async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
                ...values
            })
            // cause store this data directly to the store
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message)
        }
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                image: "",
                status: "",
                token: "",
            }
        }
    },
    // store this user data to the redux store
    extraReducers(builder) {

    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer