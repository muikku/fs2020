import React from 'react'
import { useSelector } from 'react-redux'
///import Blog from './Blog'

const UserList = () => {
  const users = useSelector(state => state.users)

  return(
    <div id="blogs">
      {users.map( u => <div key={u.username}>{u.username}</div>)}
    </div>
  )
}

export default UserList