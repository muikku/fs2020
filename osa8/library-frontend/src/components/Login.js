import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({setToken, setPage, show}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error => {
      console.log(error.graphQLErrors[0].message)
    })
  })

  useEffect(() => {
    if( result.data ) {
      setPage('books')
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('logged-library-user', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        />
        <input 
        type="password"
        value={password}
        onChange={({target}) => setPassword(target.value)}
        />
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default Login