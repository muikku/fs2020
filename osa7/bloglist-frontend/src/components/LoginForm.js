import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username: username.value, password: password.value }))
      username.reset()
      password.reset()
      dispatch(notify('Welcome!', 5))
    } catch (exception) {
      dispatch(notify('wrong username or password', 5))
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          {...username}
        />
      </div>
      <div>
        password
        <input
          {...password}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm