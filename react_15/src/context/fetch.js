import { createContext } from 'react'



const context = createContext()

const handler = async props => {

  try {
    props.onStart && props.onStart()
    const responce = await fetch(props.url, props.configuration)
    if(!responce.ok)
      throw new Error('error')
    const data = await responce.json()
    let tailData = null
    if(props.dataTail) {
      const dataTailArray = props.dataTail.split('.')
      tailData = data[dataTailArray[0]]
      if(dataTailArray.length > 1) {
        for(let iterator = 1; iterator < dataTailArray.length; ++iterator) {
          tailData = tailData[dataTailArray[iterator]]
        }
      }
    }
    if(props.onSuccess) {
      props.onSuccess(tailData ? tailData : data)
      props.onFinish && props.onFinish()
      return
    }
    props.onFinish && props.onFinish()
    return tailData ? tailData : data
  } catch(error) {
    if(props.onFail) {
      props.onFail('error')
      props.onFinish && props.onFinish()
      return
    }
    props.onFinish && props.onFinish()
    return { error: error.message }
  }

}

export const Provider = dataProps => {

  
  
  return (

    <context.Provider value={ { handler } }>



      { dataProps.children }



    </context.Provider>

  )



}



export default context