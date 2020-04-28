import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)

  return(
    <div id="blogs">
      <div>blogs created</div>
      {users.map( u => <div key={u.username}><Link to={`/users/${u.id}`}>{u.username}</Link>  {u.blogs.length}</div>)}
    </div>
  )
}

export default UserList