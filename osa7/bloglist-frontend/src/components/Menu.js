import { Link } from 'react-router-dom'
import React from 'react'

const Menu = () => {
  return(
    <div>
      <Link to='/blogs'> blogs</Link>
      <Link to='/create'> create blog</Link>
      <Link to='/users'> users</Link>
    </div>
  )
}

export default Menu