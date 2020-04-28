import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import  { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')



  const handleSubmit = (event) => {
    event.preventDefault()
    try{
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      dispatch(createBlog(newBlog))
      dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    } catch(error){
      dispatch(notify('there was a problem, could not add blog', 5))
    }
    createBlog()
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
          required/>
      </div>
      <div>
        author
        <input
          {...author}
          required/>{/*backend does not require this(?)*/}
      </div>
      <div>
        url
        <input
          {...url}
          required/>
      </div>
      <button id='blogSubmitButton' type="submit">submit</button>
    </form>
  )
}

export default BlogForm