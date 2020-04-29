import React from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import { clear } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const handleClick = () => {
    dispatch(clear())
  }
  if(!notification){
    return null
  }
  return (
    <Snackbar open={true} onClose={handleClick}>
      <Alert onClose={handleClick} severity={notification.severity}>
        {notification && <div className='error'>{notification.message}</div>}
      </Alert>
    </Snackbar>

  )
}



export default Notification