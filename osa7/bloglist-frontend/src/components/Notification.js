import React from 'react'
import {  useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  if(!notification){
    return null
  }
  return (
    <Alert severity={notification.severity}>
      {notification && <div className='error'>{notification.message}</div>}
    </Alert>
  )
}



export default Notification