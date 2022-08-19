import classes from './Error.module.css'



const Error = dataProps => {



  return (

    <div className={ classes.error }>



      { dataProps.error }



    </div>

  )



}



export default Error