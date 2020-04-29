import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'

import { TextField, Button, } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')


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
    <form onSubmit={handleLogin}>
      <div>
        <TextField label="username" inputProps={username} required/>
      </div>
      <div>
        <TextField label="password" inputProps={password} required/>
      </div>
      <Button variant="contained" id='login-button' type="submit">login</Button>
    </form>
  )
}

export default LoginForm