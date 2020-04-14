import React from 'react'

const BlogForm = ({
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
          value={author}
          name="author"
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

export default BlogForm