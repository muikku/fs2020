import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'


const LoggedInText = () => {
  const loggedUser = useSelector(state => state.login)
  return (
    <>
      {loggedUser &&
        <em><Typography
          color="inherit"
          component={Link}
          to={`/users/${loggedUser.id}`}>
          {loggedUser.name}
        </Typography> logged in </em>
      }
    </>
  )
}

export default LoggedInText