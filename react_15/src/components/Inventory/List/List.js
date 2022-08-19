import classes from './List.module.css'

import { useSelector } from 'react-redux'
import Item from './Item/Item'
import Summary from './Summary'



const List = dataProps => {



  const inventorySlice = useSelector(store => store.inventory)
  

  
  const DOM = (
    <ul>
      { inventorySlice.list.map(item => (
        <Item key={ item.inventoryId } item={ item } />
      )) }
    </ul>
  )
  
  
  return (

    <section className={ classes.list }>



      <h2>inventory</h2>

      { DOM }

      <Summary totalPrice={ inventorySlice.totalPrice } />

      <div className={ classes.actions }>
        <button type='button' onClick={ dataProps.inventoryVisibilityHandler }>
          close
        </button>

        { inventorySlice.listLength !== 0 && (
          <button type='button' onClick={ dataProps.orderFormVisibilityHandler }>
            order
          </button>
        ) }
      </div>



    </section>

  )



}



export default List