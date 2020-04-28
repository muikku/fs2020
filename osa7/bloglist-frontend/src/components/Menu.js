import { Link } from 'react-router-dom'
import React from 'react'
import Logout from './Logout'

const Menu = () => {
  return(
    <div>
      <Link to='/blogs'> blogs </Link>
      <Link to='/create'> create blog </Link>
      <Link to='/users'> users </Link>
      <Logout />
    </div>
  )
}

export default Menu