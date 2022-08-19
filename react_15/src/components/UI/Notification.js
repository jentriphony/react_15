import classes from './Notification.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { uiSliceActions } from './../../redux/ui'
import { Fragment } from 'react'
import Spinner from './Spinner'



const Notification = () => {



  const slice = useSelector(store => store.ui.notification)



  const dispatch = useDispatch()



  const visibilityHandler = () => dispatch(uiSliceActions.notificationHandler({ visible: false }))


  let statusClass = null
  if(slice.status === 'error')
    statusClass = classes.error
  else if(slice.status === 'success')
    statusClass = classes.success
  else statusClass = classes.loading
  const className = `${ classes.notification } ${ statusClass }`
  
  
  return (

    <Fragment>



      { slice.visible && (
        <section className={ className }>



          { slice.status === 'loading' && (
            <Spinner className={ classes.spinner } />
          ) }

          <h2>{ slice.title }</h2>

          <p>{ slice.message }</p>

          { slice.status !== 'loading' && (
            <button
              className={ classes['close-button'] }
              type='button'
              onClick={ visibilityHandler }
            >
              x
            </button>
          ) }



        </section>
      ) }



    </Fragment>

  )



}



export default Notification