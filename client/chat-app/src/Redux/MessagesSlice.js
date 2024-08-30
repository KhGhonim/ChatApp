// MessagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (user, { rejectWithValue }) => {
    const API = import.meta.env.VITE_DB_URL;

    try {
      const res = await fetch(`${API}/api/messages/getMessages/${user}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
      return data.messages;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    FetchedMessages: [],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.FetchedMessages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default messagesSlice.reducer;
