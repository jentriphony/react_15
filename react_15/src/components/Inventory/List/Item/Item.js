import classes from './Item.module.css'

import { useContext } from 'react'
import FetchContext from './../../../../context/fetch'
import { useDispatch } from 'react-redux'
import { inventorySliceActions, fetchAction as inventorySliceFetchHandler } from './../../../../redux/inventory'



const Item = dataProps => {
  


  const fetchContext = useContext(FetchContext)
    
  
  
  const dispatch = useDispatch()
  

  
  const removeButtonHandler = () => {
    
    dispatch(inventorySliceActions.remove({
      id: dataProps.item.id,
      count: 1
    }))
    dispatch(inventorySliceFetchHandler({
      handler: fetchContext.handler,
      handlerConfiguration: {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: dataProps.item,
          count: 1,
          action: 'subtraction'
        })
      },
      actionName: 'ignore'
    }))

  }

  const addButtonHandler = () => {
    
    dispatch(inventorySliceActions.add({
      item: dataProps.item,
      count: 1
    }))
    inventorySliceFetchHandler({
      handler: fetchContext.handler,
      handlerConfiguration: {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: dataProps.item,
          count: 1,
          action: 'addition'
        })
      },
      actionName: 'ignore'
    })(dispatch)

  }
  
  
  return (

    <li className={ classes.item }>



      <header>
        <h3>{ dataProps.item.title }</h3>

        <div>
          <span className={ classes['price-total'] }>
            { `$${ dataProps.item.price * dataProps.item.count }` }
          </span>

          <span className={ classes['price-item'] }>
            { `$${ dataProps.item.price }` }
          </span>
        </div>
      </header>

      <div className={ classes.details }>
        <div className={ classes.count }>
          <span>{ `x${ dataProps.item.count }` }</span>
        </div>

        <div className={ classes.actions }>
          <button type='button' onClick={ removeButtonHandler }>
            -
          </button>

          <button type='button' onClick={ addButtonHandler }>
            +
          </button>
        </div>
      </div>



    </li>

  )



}



export default Item