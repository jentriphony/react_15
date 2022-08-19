import { createContext, useReducer } from 'react'



const context = createContext()

const reducer = (state, reducerProps) => {
  if(reducerProps.action.type === 'FETCH_LIST_FINISHED') {
    const result = JSON.parse(JSON.stringify(state))
    result.fetchListFinished = true
    return result
  }
  if(reducerProps.action.type === 'FETCH_INVENTORY_FINISHED') {
    const result = JSON.parse(JSON.stringify(state))
    result.fetchInventoryFinished = true
    return result
  }
}

export const Provider = dataProps => {



  const [data, dispatch] = useReducer(reducer, {
    fetchListFinished: false,
    fetchInventoryFinished: false
  })



  const fetchListFinishedHandler = () => dispatch({ action: { type: 'FETCH_LIST_FINISHED' } })

  const fetchInventoryFinishedHandler = () => dispatch({ action: { type: 'FETCH_INVENTORY_FINISHED' } })
  
  
  return (

    <context.Provider
      value={ {
        fetchFinished: {
          list: {
            value: data.fetchListFinished,
            handler: fetchListFinishedHandler
          },
          inventory: {
            value: data.fetchInventoryFinished,
            handler: fetchInventoryFinishedHandler
          }
        }
      } }
    >



      { dataProps.children }



    </context.Provider>

  )



}



export default context