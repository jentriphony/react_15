import { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InitialContext from './../../context/initial'
import FetchContext from './../../context/fetch'
import { Fragment } from 'react'
import { headerSliceActions } from './../../redux/header'
import { inventorySliceActions } from './../../redux/inventory'
import { fetchAction as inventorySliceFetchAction } from './../../redux/inventory'
import Modal from './../UI/Modal'
import List from './List/List'
import OrderForm from './OrderForm/OrderForm'




const Inventory = () =>  {


  
  const initialContext = useContext(InitialContext)

  const fetchContext = useContext(FetchContext)



  const visible = useSelector(store => store.header.inventoryVisible)

  const orderFormVisible = useSelector(store => store.inventory.orderFormVisible)
  
  
  
  const dispatch = useDispatch()

  

  const orderFormVisibilityHandler = () => dispatch(inventorySliceActions.orderFormVisibilityHandler())

  const visibilityHandler = () => {

    orderFormVisible && orderFormVisibilityHandler()
    dispatch(headerSliceActions.inventoryVisibilityHandler())

  }



  useEffect(() => {

    if(initialContext.fetchFinished.inventory.value) return
    inventorySliceFetchAction({
      handler: fetchContext.handler,
      dataTail: 'data.list',
      actionName: 'set'
    })(dispatch)
    initialContext.fetchFinished.inventory.handler()

  }, [initialContext, fetchContext, dispatch])
  
  
  return (

    <Fragment>



      { visible && (
        <Modal onClickBackdrop={ visibilityHandler }>
          { !orderFormVisible && (
            <List inventoryVisibilityHandler={ visibilityHandler } orderFormVisibilityHandler={ orderFormVisibilityHandler } />
          ) }

          { orderFormVisible && (
            <OrderForm onClose={ orderFormVisibilityHandler } />
          ) }
        </Modal>
      ) }



    </Fragment>

  )



}



export default Inventory