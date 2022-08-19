import { createSlice } from '@reduxjs/toolkit'



const headerSlice = createSlice({
  name: 'header',
  initialState: { inventoryVisible: null },
  reducers: {
    inventoryVisibilityHandler: slice => {
      slice.inventoryVisible = !slice.inventoryVisible
    }
  }
})



export const headerSliceReducer = headerSlice.reducer
export const headerSliceActions = headerSlice.actions
export default headerSlice