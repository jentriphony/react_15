import classes from './List.module.css'

import {
  useState,
  useCallback,
  useContext,
  useEffect,
  Fragment
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InitialContext from './../../context/initial'
import FetchContext from './../../context/fetch'
import { fetchAction as listSliceFetchAction } from './../../redux/list'
import Spinner from './../UI/Spinner'
import Item from './Item/Item'



const List = () => {



  const [loading, setLoading] = useState(false)



  const loadingHandler = useCallback(() => setLoading(state => !state), [])
  
  
  
  const initialContext = useContext(InitialContext)

  const fetchContext = useContext(FetchContext)
  
  
  
  const slice = useSelector(store => store.list)



  const dispatch = useDispatch()

  
  
  useEffect(() => {

    if(initialContext.fetchFinished.list.value) return
    listSliceFetchAction({
      handler: fetchContext.handler,
      onStart: loadingHandler,
      dataTail: 'data',
      onFinish: loadingHandler,
      actionName: 'set'
    })(dispatch)
    initialContext.fetchFinished.list.handler()

  }, [initialContext, fetchContext, loadingHandler, dispatch])
  
  const DOM = (
    <ul>
      { slice.value.map(item => (
        <Item key={ item.id } item={ item } />
      )) }
    </ul>
  )
  
  
  return (

    <Fragment>



      { loading && (
        <Spinner className={ classes.spinner } />
      ) }

      <section className={ classes.list }>



        <h2>list</h2>

        { DOM }



      </section>



    </Fragment>

  )



}



export default List