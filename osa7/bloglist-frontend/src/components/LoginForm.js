import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'

import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'



const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username: username.value, password: password.value }))
      username.onSubmit()
      password.onSubmit()
    } catch (exception) {
      console.log(exception)
      dispatch(notify('wrong username or password', 5))
    }
  }
  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleLogin}>
            <div>
              <TextField label="username" inputProps={username} required/>
            </div>
            <div>
              <TextField label="password" inputProps={password} required/>
            </div>
            <DialogActions>
              <Button variant="contained" id='login-button' type="submit">login</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginForm