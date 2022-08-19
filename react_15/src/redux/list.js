import { createSlice } from '@reduxjs/toolkit'
import urlsSlice from './urls'



const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: [],
    errors: { url: false }
  },
  reducers: {
    set: (slice, reducerProps) => {
      slice.value = reducerProps.payload.data || []
      if(!slice.value.error) return
      slice.value = []
      slice.errors.url = true
    }
  }
})

export const fetchAction = actionProps => {
  return async dispatch => {
    const data = await actionProps.handler({
      onStart: actionProps.onStart,
      url: urlsSlice.getInitialState().list,
      configuration: actionProps.handlerConfiguration,
      dataTail: actionProps.dataTail,
      onFinish: actionProps.onFinish
    })
    actionProps.actionProps && (actionProps.actionProps.data = data)
    return dispatch(listSlice.actions[actionProps.actionName]({ data: actionProps.actionProps ? actionProps.actionProps : data }))
  }
}



export const listSliceReducer = listSlice.reducer
export const listSliceActions = listSlice.actions
export default listSlice