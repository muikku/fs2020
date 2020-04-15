import React, { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type='text'
          value={title}
          name="author"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name="Password"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name="Password"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm