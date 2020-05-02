import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'

import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'



const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const name = useField('text')
  const password = useField('password')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const handleSignIn = async (event) => {
    event.preventDefault()
    try {
      dispatch(signIn({ username: username.value, password: password.value, name: name.value }))
      ///onsubmit clears input fields
      username.onSubmit()
      password.onSubmit()
      name.onSubmit()
    } catch (exception) {
      dispatch(notify('an error while trying to sign in', 5))
    }
  }
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
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