import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../reducers/loginReducer'
import { useField } from '../hooks'

import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'



const LoginForm = ({ handleClick }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const username = useField('text')
  const name = useField('text')
  const password = useField('password')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    handleClick()
  }
  const handleClose = () => {
    setOpen(false)
  }


  const handleSignIn = async (event) => {
    event.preventDefault()
    dispatch(signIn({ username: username.value, password: password.value, name: name.value }, history))
  }
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        Sign in
      </MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSignIn}>
            <div>
              <TextField label="name" inputProps={name} required/>
            </div>
            <div>
              <TextField label="username" inputProps={username} required/>
            </div>
            <div>
              <TextField label="password" inputProps={password} required/>
            </div>
            <DialogActions>
              <Button variant="contained" id='login-button' type="submit">sign in</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginForm