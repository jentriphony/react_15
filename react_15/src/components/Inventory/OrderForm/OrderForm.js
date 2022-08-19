import classes from './OrderForm.module.css'

import {
  useState,
  useContext,
  useRef,
  useCallback
} from 'react'
import FetchContext from './../../../context/fetch'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAction as inventorySliceFetchAction } from './../../../redux/inventory'
import InputRef from './../../UI/InputRef'



const OrderForm = dataProps => {



  const [active, setActive] = useState(false)



  const fetchContext = useContext(FetchContext)



  const [
    input_1_ref,
    input_2_ref,
    input_3_ref,
    input_4_ref
  ] = [
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ]



  const inputValidationHandler = useCallback(value => value.trim() !== '', [])



  const inventorySlice = useSelector(store => store.inventory)
  
  
  
  const dispatch = useDispatch()



  const validationHandler = () => (
    inputValidationHandler(input_1_ref.current.value) &&
    inputValidationHandler(input_2_ref.current.value) &&
    inputValidationHandler(input_3_ref.current.value) &&
    inputValidationHandler(input_4_ref.current.value)
  )
  
  const submitHandler = event => {

    event.preventDefault()

    !active && setActive(true)
    if(validationHandler()) {
      dispatch(inventorySliceFetchAction({
        handler: fetchContext.handler,
        handlerConfiguration: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            list: inventorySlice.list,
            order: {
              'input_1': input_1_ref.current.value,
              'input_2': input_2_ref.current.value,
              'input_3': input_3_ref.current.value,
              'input_4': input_4_ref.current.value
            }
          })
        },
        actionName: 'reset'
      }))
    }

  }
  
  
  return (

    <form className={ classes.form } onSubmit={ submitHandler }>



      <div className={ classes.group }>
        <InputRef
          attributes={ {
            type: 'text',
            id: 'input_1'
          } }
          label='input_1'
          validationHandler={ inputValidationHandler }
          formActive={ active }
          ref={ input_1_ref }
        />

        <InputRef
          attributes={ {
            type: 'text',
            id: 'input_2'
          } }
          label='input_2'
          validationHandler={ inputValidationHandler }
          formActive={ active }
          ref={ input_2_ref }
        />
      </div>

      <div className={ classes.group }>
        <InputRef
          attributes={ {
            type: 'text',
            id: 'input_3'
          } }
          label='input_3'
          validationHandler={ inputValidationHandler }
          formActive={ active }
          ref={ input_3_ref }
        />

        <InputRef
          attributes={ {
            type: 'text',
            id: 'input_4'
          } }
          label='input_4'
          validationHandler={ inputValidationHandler }
          formActive={ active }
          ref={ input_4_ref }
        />
      </div>

      <div className={ classes.actions }>
        <button type='button' onClick={ dataProps.onClose }>
          return
        </button>

        <button type='button' onClick={ submitHandler }>
          submit
        </button>
      </div>



    </form>

  )



}



export default OrderForm