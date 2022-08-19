import { createSlice } from '@reduxjs/toolkit'



const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: {
      status: null,
      title: null,
      message: null,
      visible: null
    }
  },
  reducers: {
    notificationHandler: (slice, reducerProps) => {
      if(reducerProps.payload.visible === false) {
        slice.notification.visible = false
        return
      }
      slice.notification.status = reducerProps.payload.status
      slice.notification.title = reducerProps.payload.title
      slice.notification.message = reducerProps.payload.message
      slice.notification.visible = true
    }
  }
})



export const uiSliceReducer = uiSlice.reducer
export const uiSliceActions = uiSlice.actions
export default uiSlice