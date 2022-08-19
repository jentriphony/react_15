import { useState, useEffect } from 'react'



const useInput = hookProps => {



  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)



  const inputHandler = event => {

    !active && setActive(true)
    setValue(event.target.value)

  }

  const blurHandler = () => !active && setActive(true)

  const reset = () => {

    setActive(false)
    setValue('')

  }

  const validationHandler = hookProps.validationHandler
  useEffect(() => {

    let timer = null
    if(active && !validationHandler(value))
      timer = setTimeout(() => setError(true), 1024)
    else if(active && validationHandler(value))
      error && setError(false)
    if(timer) return () => clearTimeout(timer)

  }, [error, active, validationHandler, value])


  return {
    value,
    active: active || hookProps.formActive,
    inputHandler,
    blurHandler,
    error,
    reset
  }



}



export default useInput