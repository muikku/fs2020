import React from 'react'
import {  useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notifications)
  return (
    <div>
      {message && <div className='error'>{message}</div>}
    </div>
  )
}



export default Notification