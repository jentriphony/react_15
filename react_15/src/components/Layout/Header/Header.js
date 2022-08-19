import classes from './Header.module.css'

import InventoryButton from './Inventory/InventoryButton'



const Header = dataProps => {



  const themeHandler = event => {

    if(event.target.id === 'theme-light') {
      document.body.style.background = 'rgba(255, 255, 255, 0.8)'
      document.body.style.color = 'rgba(0, 0, 0, 0.8)'
      return
    }
    document.body.style.background = 'rgba(0, 0, 0, 0.8)'
    document.body.style.color = 'rgba(255, 255, 255, 0.8)'

  }
  
  
  return (

    <header className={ classes.header }>



      <h1>header</h1>

      <nav>
        <ul>
          <li className={ classes['theme-button'] } onClick={ themeHandler }>
            <div className={ classes['theme-light'] } id='theme-light'></div>

            <div className={ classes['theme-dark'] } id='theme-dark'></div>
          </li>

          <li>
            <InventoryButton />
          </li>
        </ul>
      </nav>



    </header>

  )



}



export default Header