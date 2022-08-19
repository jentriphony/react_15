import classes from './InventoryButton.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { headerSliceActions } from './../../../../redux/header'



const InventoryButton = () => {



  const inventoryListLength = useSelector(store => store.inventory.listLength)
  
  
  
  const dispatch = useDispatch()
  
  
  
  const clickHandler = () => dispatch(headerSliceActions.inventoryVisibilityHandler())
  
  
  return (

    <button
      className={ classes.button }
      type='button'
      onClick={ clickHandler }
    >



      inventory

      <span className={ classes.badge }>
        { inventoryListLength }
      </span>



    </button>

  )



}



export default InventoryButton