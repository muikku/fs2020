import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'


const Logout = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <em><Button color="inherit" component={Link} to={`/users/${loggedUser.id}`}>{loggedUser.name}</Button> logged in {<Button variant="outlined" color="inherit" onClick={handleLogout}>logout</Button>}</em>
  )
}

export default Logout