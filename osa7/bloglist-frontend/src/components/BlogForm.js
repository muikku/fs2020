import React from 'react'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import  { createBlog } from '../reducers/blogReducer'
import { updateUserBlogs } from '../reducers/userReducer'
import { TextField, Button, FormLabel } from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const handleSubmit = (event) => {
    event.preventDefault()
    try{
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      dispatch(createBlog(newBlog))
      /*ei toimi vielä*/
      dispatch(updateUserBlogs(user, newBlog))
      /* */
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
      <h3>create blog</h3>
      <div>
        <TextField
          label="title"
          inputProps={title}
          required
        />
      </div>
      <div>
        <TextField
          label="author"
          inputProps={author}
          required
        />
      </div>
      <div>
        <TextField
          label="url"
          inputProps={url}
          required
        />
      </div>
      <Button id='blogSubmitButton' type="submit">submit</Button>
    </form>
  )
}

export default BlogForm