import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as InitialProvider } from './context/initial'
import { Provider as FetchProvider } from './context/fetch'
import { Provider } from 'react-redux'
import store from './redux/index'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

  // <React.StrictMode>



    <InitialProvider>
      <FetchProvider>
        <Provider store={ store }>
          <App />
        </Provider>
      </FetchProvider>
    </InitialProvider>



  // </React.StrictMode>

)