import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
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
          id='username'
          type='text'
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
                password
        <input
          id='password'
          type='text'
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm