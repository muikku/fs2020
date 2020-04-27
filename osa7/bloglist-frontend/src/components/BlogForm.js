import React from 'react'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    title.onSubmit()
    author.onSubmit()
    url.onSubmit()
  }

  return (
    <form className='formDiv' onSubmit={handleSubmit}>
      <div>
        title
        <input
          {...title}
        />
      </div>
      <div>
        author
        <input
          {...author}
        />
      </div>
      <div>
        url
        <input
          {...url}
        />
      </div>
      <button id='blogSubmitButton' type="submit">submit</button>
    </form>
  )
}

export default BlogForm