import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { MenuItem } from '@material-ui/core'


const Logout = ({ handleClick }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    handleClick()
  }
  return (
    <MenuItem onClick={handleLogout}>
      logout
    </MenuItem>
  )
}

export default Logout