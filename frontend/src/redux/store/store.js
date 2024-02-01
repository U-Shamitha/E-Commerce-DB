import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../userSlice';
import filterOptionsSlice from '../filterOptionsSlice';

const store = configureStore({
  reducer: {
    user : userSlice,
    filterOptions: filterOptionsSlice
  }
});


export default store;
