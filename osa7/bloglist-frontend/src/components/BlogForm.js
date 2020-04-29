import React from 'react'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import  { createBlog } from '../reducers/blogReducer'
import { updateUserBlogs } from '../reducers/userReducer'
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.login)

  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog, history))
    /*ei toimi vielä*/
    dispatch(updateUserBlogs(user, newBlog))
    /* */
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