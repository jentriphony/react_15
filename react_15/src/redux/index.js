import { configureStore } from '@reduxjs/toolkit'
import { uiSliceReducer } from './ui'
import { headerSliceReducer } from './header'
import { listSliceReducer } from './list'
import { inventorySliceReducer } from './inventory'
import { urlsSliceReducer } from './urls'



const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    header: headerSliceReducer,
    list: listSliceReducer,
    inventory: inventorySliceReducer,
    urls: urlsSliceReducer
  }
})



export default store