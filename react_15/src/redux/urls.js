import { createSlice } from '@reduxjs/toolkit'



const urlsSlice = createSlice({
  name: 'urls',
  initialState: {
    header: {},
    inventory: 'http://localhost:8000/api/inventory',
    list: 'http://localhost:8000/api/list'
  }
})



export const urlsSliceReducer = urlsSlice.reducer
export const urlsSliceActions = urlsSlice.actions
export default urlsSlice