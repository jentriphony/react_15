import classes from './Card.module.css'



const Card = dataProps => {



  const className = `${ classes.card }${ dataProps.className && ' ' + dataProps.className }`


  return (

    <section className={ className }>



      { dataProps.children }



    </section>

  )



}



export default Card