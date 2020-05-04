import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'


const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Typography color="inherit" onClick={handleLogout}>
      logout
    </Typography>
  )
}

export default Logout