import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const CHAT_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/conversation`;

// initial state
const initialState = {
    status: '',
    error: '',
    conversations: [],
    activeConvo: {},
    notifications: [],
}

// create methods here
export const getConvo = createAsyncThunk(
    "conversation/all",
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(CHAT_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return data

        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    })


// create methods here
export const createConversation = createAsyncThunk(
    "conversation/open_chat",
    async (values, { rejectWithValue }) => {
        console.log(values);
        const { token, receiver_id } = values
        try {
            const { data } = await axios.post(
                CHAT_ENDPOINT,
                // cause we send this revceiver id as a body
                { receiver_id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            console.log(data);
            return data

        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    })


// create slice
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: ((state, action) => {
            state.activeConvo = action.payload;
        })
    },
    extraReducers(builder) {
        builder
            .addCase(getConvo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getConvo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.conversations = action.payload
            })
            .addCase(getConvo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })
            .addCase(createConversation.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.activeConvo = action.payload
            })
            .addCase(createConversation.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })

    }
})

export const { setActiveConversation } = chatSlice.actions;


export default chatSlice.reducer