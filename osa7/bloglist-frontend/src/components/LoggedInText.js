import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const LoggedInText = ({ handleClick }) => {
  const loggedUser = useSelector(state => state.login)
  const history = useHistory()
  const handleOpen = () => {
    handleClick()
    history.push(`/users/${loggedUser.id}`)
  }
  return (
    <MenuItem onClick={handleOpen}>
      {loggedUser &&
        <Typography>
          {loggedUser.name}
        </Typography>
      }
    </MenuItem>
  )
}

export default LoggedInText