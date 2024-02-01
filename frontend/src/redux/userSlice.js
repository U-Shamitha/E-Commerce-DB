import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {},
  activeTab: 'product',
  isLoading: false,
  error: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    try {
        let data = null;
        if(!!localStorage.getItem('formData')){
        // Fetch user data from localStorage
        data = JSON.parse(localStorage.getItem('formData'));
        // console.log(data);
        }
        return data
        } catch (error) {
        console.error('Error fetching user data from localStorage:', error);
        }

  }
)

export const setUser = createAsyncThunk(
  'user/setUser',
  async (data) => {
    return data
  }
)

export const setActiveTab = createAsyncThunk(
  'user/setActiveTab',
  async (data) => {
    return data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log(action.payload)
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(setUser.fulfilled,(state,action)=>{
        state.user.user = action.payload
    })
    builder.addCase(setActiveTab.fulfilled,(state,action)=>{
      state.activeTab = action.payload
  })
  },
})

export default userSlice.reducer