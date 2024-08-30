import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  SelectedConversation: null
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    SignOut: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
      state.SelectedConversation = null
    },

    SignInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    UserDetails: (state, action) => {
      state.SelectedConversation = action.payload

    },
    UserUpdate: (state, action) => {
      state.currentUser = action.payload

    },
  },
})

// Action creators are generated for each case reducer function
export const { SignInSuccess, SignOut, UserDetails, UserUpdate } = UserSlice.actions

export default UserSlice.reducer