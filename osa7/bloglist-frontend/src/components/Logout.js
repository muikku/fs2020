import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'


const Logout = () => {
  const dispatch = useDispatch()
  const name = useSelector(state => state.login.name)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <em>{name} logged in {<Button variant="outlined" color="inherit" onClick={handleLogout}>logout</Button>}</em>
  )
}

export default Logout