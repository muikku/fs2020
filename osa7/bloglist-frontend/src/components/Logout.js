import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const Logout = () => {
  const dispatch = useDispatch()
  const name = useSelector(state => state.login.name)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <p>{name} logged in {<button onClick={handleLogout}>logout</button>}</p>
  )
}

export default Logout