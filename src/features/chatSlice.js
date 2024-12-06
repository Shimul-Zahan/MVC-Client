import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const CHAT_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/message`;

// initial state
const initialState = {
    status: '',
    error: '',
    conversations: [],
    messages: [],
    activeConvo: {},
    notifications: [],
    files: [],
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
        // console.log(values);
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
            // console.log(data);
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
        // console.log(values);
        const { token, convo_id } = values
        try {
            const { data } = await axios.get(
                `${MESSAGE_ENDPOINT}/${convo_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            // console.log(data);
            return data

        } catch (error) {
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    })


// create convo messages
export const sendMessage = createAsyncThunk(
    "conversation/send",
    async (values, { rejectWithValue }) => {
        // console.log(values);
        const { token, message, convo_id, files } = values
        try {
            const { data } = await axios.post(
                MESSAGE_ENDPOINT,
                {
                    message,
                    convo_id,
                    files,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            // console.log(data);
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
        setActiveConversation: (state, action) => {
            state.activeConvo = action.payload;
        },
        updateMessageAndConversation: (state, action) => {
            //* update message
            // console.log(state, action, "from chat slice for update message");
            let convo = state.activeConvo._id
            // console.log(convo);
            if (state.activeConvo && state.activeConvo._id === action.payload.conversation._id) {
                state.messages.push(action.payload);
            }

            //* update the conversation
            let conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload,
            }
            let new_convo = [...state.conversations].filter(
                (c) => c._id !== conversation._id
            )
            new_convo.unshift(conversation)
            state.conversations = new_convo
        },
        addFiles: (state, action) => {
            state.files = [...state.files, action.payload];
        },
        clearFiles: (state, action) => {
            state.files = [];
        }
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
                state.messages = action.payload
            })
            .addCase(getConvoMessages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })
            .addCase(sendMessage.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.messages = [...state.messages, action.payload];
                let conversation = {
                    ...action.payload.conversation,
                    latestMessage: action.payload,
                }
                let new_convo = [...state.conversations].filter(
                    (c) => c._id !== conversation._id
                )
                new_convo.unshift(conversation)
                state.conversations = new_convo
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })
    }
})

export const { setActiveConversation, updateMessageAndConversation, addFiles, clearFiles } = chatSlice.actions;


export default chatSlice.reducer