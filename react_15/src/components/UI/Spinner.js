import classes from './Spinner.module.css'



const Spinner = dataProps => {

  
  
  const className = `${ classes.spinner }${ dataProps.className ? ' ' + dataProps.className : '' }`
  
  
  return (

    <div className={ className }></div>

  )



}



export default Spinner