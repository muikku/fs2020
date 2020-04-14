import React from 'react'

const Logout = ({ name, handleLogout }) => {
  return (
    <p>{name} logged in {<button onClick={handleLogout}>logout</button>}</p>
  )
}

export default Logout