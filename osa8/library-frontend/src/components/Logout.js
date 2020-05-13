import React from 'react'
import { useApolloClient } from '@apollo/client'

const Logout = ({setToken, setPage}) => {
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }
  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Logout