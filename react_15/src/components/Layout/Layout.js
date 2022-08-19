import { Fragment } from 'react'
import Header from './Header/Header'



const Layout = dataProps => {



  return (

    <Fragment>



      <Header />

      <main>{ dataProps.children }</main>



    </Fragment>

  )



}



export default Layout