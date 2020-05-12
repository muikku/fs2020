import React from 'react'
import { useApolloClient } from '@apollo/client'

const Logout = ({setToken}) => {
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Logout