import React from 'react'

const Login = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
                username
        <input
          type='text'
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
                password
        <input
          type='text'
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login