import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSideBarOpen: false,
  sortOption: null,
  productName: '',
  productCategory: '',
  productBrand: '',
  priceRange: [],
  ratingRange: {value:{start:'0'}},
  quantity: ''
}

export const fetchFilterOptions = createAsyncThunk(
  'filter/fetchFilterOptions',
  async () => {
    try {
        let data = null;
        if(!!localStorage.getItem('filterOptions')){
          data = JSON.parse(localStorage.getItem('filterOptions'));
          console.log("filterOptions", data);
        }
        return data
        } catch (error) {
          console.error('Error fetching filter options data from localStorage:', error);
        }

  }
)

export const setIsSideBarOpen = createAsyncThunk(
  'filter/setIsSideBarOpen ',
  async (data) => {
    return data
  }
)

export const setSortOption = createAsyncThunk(
  'filter/setSortOption',
  async (data) => {
    return data
  }
)

export const setProductName = createAsyncThunk(
    'filter/setProductName',
    async (data) => {
      return data
    }
  )

  export const setProductCategory = createAsyncThunk(
    'filter/setProductCategory',
    async (data) => {
      return data
    }
  )

  export const setProductBrand = createAsyncThunk(
    'filter/setProductBrand',
    async (data) => {
      return data
    }
  )
  
  export const setPriceRange= createAsyncThunk(
    'filter/setPriceRange',
    async (data) => {
      return data
    }
  )

  export const setRatingRange= createAsyncThunk(
    'filter/setRatingRange',
    async (data) => {
      return data
    }
  )

  
  export const setQuantity= createAsyncThunk(
    'filter/setQuantity',
    async (data) => {
      return data
    }
  )

export const filterOptionsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilterOptions.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchFilterOptions.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log(action.payload)
      state = action.payload
    })
    builder.addCase(fetchFilterOptions.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(setIsSideBarOpen.fulfilled,(state,action)=>{
      state.isSideBarOpen = action.payload
    })
    builder.addCase(setSortOption.fulfilled,(state,action)=>{
      state.sortOption = action.payload
  })
    builder.addCase(setProductName.fulfilled,(state,action)=>{
        state.productName = action.payload
    })
    builder.addCase(setProductCategory.fulfilled,(state,action)=>{
      state.productCategory = action.payload
    })
    builder.addCase(setProductBrand.fulfilled,(state,action)=>{
      state.productBrand = action.payload
    })
    builder.addCase(setPriceRange.fulfilled,(state,action)=>{
      state.priceRange = action.payload
    })
    builder.addCase(setRatingRange.fulfilled,(state,action)=>{
      state.ratingRange = action.payload
    })
    builder.addCase(setQuantity.fulfilled,(state,action)=>{
      state.quantity = action.payload
    })
  },
})

export default filterOptionsSlice.reducer