import React from 'react'

const BlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type='text'
          value={title}
          name="author"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name="Password"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name="Password"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm