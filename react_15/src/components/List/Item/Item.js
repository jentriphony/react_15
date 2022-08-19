import classes from './Item.module.css'

import {
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react'
import FetchContext from './../../../context/fetch'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAction as inventorySliceFetchAction } from './../../../redux/inventory'
import Card from './../../UI/Card'



const Item = dataProps => {
  
  

  const [addButtonActive, setAddButtonActive] = useState(false)



  const addButtonHandler = useCallback(() => setAddButtonActive(state => !state), [])



  const fetchContext = useContext(FetchContext)



  const inventorySliceList = useSelector(store => store.inventory.list)
  
  
  
  const dispatch = useDispatch()



  useEffect(() => {

    if(addButtonActive) {
      const timer = setTimeout(() => {
        dispatch(inventorySliceFetchAction({
          handler: fetchContext.handler,
          handlerConfiguration: {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              list: inventorySliceList,
              item: dataProps.item
            })
          },
          actionProps: JSON.parse(JSON.stringify({
            item: dataProps.item,
            count: 1
          })),
          actionName: 'add'
        }))
        addButtonHandler()
      }, 1024)
      return () => clearTimeout(timer)
    }

  }, [
    addButtonActive,
    dispatch,
    fetchContext,
    dataProps.item,
    inventorySliceList,
    addButtonHandler
  ])
  
  
  return (

    <li className={ classes.item }>



      <Card>
        <header>
          <h3>{ dataProps.item.title }</h3>

          <div className={ classes.price }>
            { `$${ dataProps.item.price }` }
          </div>
        </header>

        <p className={ classes.description }>
          { dataProps.item.description }
        </p>

        <div className={ classes.actions }>
          <button type='button' onClick={ addButtonHandler }>
            add
          </button>
        </div>
      </Card>



    </li>

  )



}



export default Item