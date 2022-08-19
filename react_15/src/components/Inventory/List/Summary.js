import classes from './Summary.module.css'



const Summary = dataProps => {



  return (

    <div className={ classes.summary }>



      <span className={ classes.title }>
        total
      </span>

      <span className={ classes['total-price'] }>
        { `$${ dataProps.totalPrice }` }
      </span>



    </div>

  )



}



export default Summary