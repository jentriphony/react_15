import { createSlice } from '@reduxjs/toolkit'
import urlsSlice from './urls'
import { uiSliceActions } from './ui'



const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    list: [],
    listLength: 0,
    totalPrice: 0,
    orderFormVisible: null,
    errors: { url: false }
  },
  reducers: {
    set: (slice, reducerProps) => {
      slice.list = reducerProps.payload.data || []
      if(!slice.list.error) {
        slice.listLength = slice.list.length
        slice.totalPrice = slice.list.reduce((tmp, currentItem) => tmp + +currentItem.count * +currentItem.price, 0)
        return
      }
      slice.list = []
      slice.errors.url = true
    },
    add: (slice, reducerProps) => {
      if(slice.errors.url) return
      let payloadPrefix = null
      if(reducerProps.payload.count) payloadPrefix = reducerProps.payload
      else payloadPrefix = reducerProps.payload.data
      const existingIndex = slice.list.findIndex(item => item.id === payloadPrefix.item.id)
      if(existingIndex !== -1) {
        slice.list[existingIndex].count += +reducerProps.payload.count
        slice.totalPrice += +payloadPrefix.item.price * +payloadPrefix.count
        return
      }
      const resultItem = JSON.parse(JSON.stringify(payloadPrefix.item))
      resultItem.count = +payloadPrefix.count
      resultItem.inventoryId = `inventory_${ resultItem.id }`
      slice.list.push(resultItem)
      ++slice.listLength
      slice.totalPrice += +resultItem.price * +payloadPrefix.count
    },
    remove: (slice, reducerProps) => {
      if(slice.errors.url) return
      const existingIndex = slice.list.findIndex(item => item.id === reducerProps.payload.id)
      if(slice.list[existingIndex].count - +reducerProps.payload.count > 0) {
        slice.list[existingIndex].count -= +reducerProps.payload.count
        slice.totalPrice -= slice.list[existingIndex].price * +reducerProps.payload.count
        return
      }
      slice.totalPrice -= slice.list[existingIndex].price * +reducerProps.payload.count
      slice.list = slice.list.filter(item => item.id !== reducerProps.payload.id)
      --slice.listLength
    },
    reset: slice => {
      slice.list = []
      slice.listLength = 0
      slice.totalPrice = 0
      slice.orderFormVisible = null
    },
    orderFormVisibilityHandler: slice => {
      slice.orderFormVisible = !slice.orderFormVisible
    },
    orderFormSubmitHandler: (slice, reducerProps) => {
      // 
    },
    ignore: () => {}
  }
})

export const fetchAction = actionProps => {
  return async dispatch => {
    const onStart = () => dispatch(uiSliceActions.notificationHandler({
      status: 'loading',
      title: 'loading',
      message: `inventory_fetch_${ actionProps.actionName }`,
    }))
    const onFinish = () => dispatch(uiSliceActions.notificationHandler({ visible: false }))
    const data = await actionProps.handler({
      onStart,
      url: urlsSlice.getInitialState().inventory,
      configuration: actionProps.handlerConfiguration,
      dataTail: actionProps.dataTail,
      onFinish
    })
    dispatch(uiSliceActions.notificationHandler({
      status: data.error ? 'error' : 'success',
      title: data.error ? 'error' : 'success',
      message: `inventory_fetch_${ actionProps.actionName }`
    }))
    actionProps.actionProps && (actionProps.actionProps.data = data)
    return dispatch(inventorySlice.actions[actionProps.actionName]({ data: actionProps.actionProps ? actionProps.actionProps : data }))
  }
}



export const inventorySliceReducer = inventorySlice.reducer
export const inventorySliceActions = inventorySlice.actions
export default inventorySlice