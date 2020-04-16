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
    <form className='formDiv' onSubmit={handleSubmit}>
      <div>
        title
        <input
          id='title'
          type='text'
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id='author'
          type='text'
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id='url'
          type='text'
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm