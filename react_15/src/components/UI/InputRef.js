import classes from './InputRef.module.css'

import { forwardRef, useImperativeHandle } from 'react'
import useInput from './../../hooks/input'
import Error from './Error'



const InputRef = forwardRef((dataProps, ref) => {
  
  
  
  const validationHandler = dataProps.validationHandler
  const inputHook = useInput({
    formActive: dataProps.formActive,
    validationHandler
  })



  useImperativeHandle(ref, () => ({ value: inputHook.value }))


  return (

    <div className={ classes.input }>



      <label htmlFor={ dataProps.attributes.id }>
        { dataProps.label }
      </label>

      <input
        { ...dataProps.attributes }
        onInput={ inputHook.inputHandler }
        onBlur={ inputHook.blurHandler }
      />

      { inputHook.active && (inputHook.error || !inputHook.value) && (
        <Error error='error_input' />
      ) }



    </div>

  )



})



export default InputRef