import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'


const LoggedInText = () => {
  const loggedUser = useSelector(state => state.login)
  return (
    <>
      {loggedUser &&
        <Typography
          color="inherit"
          component={Link}
          to={`/users/${loggedUser.id}`}>
          {loggedUser.name}
        </Typography>
      }
    </>
  )
}

export default LoggedInText