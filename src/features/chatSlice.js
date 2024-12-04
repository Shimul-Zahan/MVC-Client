import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const CHAT_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/message`;

// initial state
const initialState = {
    status: '',
    error: '',
    conversations: [],
    convo_messages: [],
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


// create convo messages
export const getConvoMessages = createAsyncThunk(
    "conversation/messages",
    async (values, { rejectWithValue }) => {
        console.log(values);
        const { token, convo_id } = values
        try {
            const { data } = await axios.get(
                `${MESSAGE_ENDPOINT}/${convo_id}`,
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
            .addCase(getConvoMessages.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getConvoMessages.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.convo_messages = action.payload
            })
            .addCase(getConvoMessages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })
    }
})

export const { setActiveConversation } = chatSlice.actions;


export default chatSlice.reducer