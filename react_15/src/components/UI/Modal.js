import classes from './Modal.module.css'

import { Fragment } from 'react'
import { createPortal } from 'react-dom'



const Backdrop = dataProps => {



  return (

    <div className={ classes.backdrop } onClick={ dataProps.onClick }></div>

  )



}

const ModalOverlay = dataProps => {



  return (

    <section className={ classes['modal-overlay'] }>



      { dataProps.children }



    </section>

  )



}

const portalTarget = document.getElementById('overlays')

const Modal = dataProps => {



  return (

    <Fragment>



      { createPortal((
        <Backdrop onClick={ dataProps.onClickBackdrop } />
      ), portalTarget) }

      { createPortal((
        <ModalOverlay>{ dataProps.children }</ModalOverlay>
      ), portalTarget) }



    </Fragment>

  )



}



export default Modal