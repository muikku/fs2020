import React, { useState } from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import  { createBlog } from '../reducers/blogReducer'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()

  const history = useHistory()


  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog, history))
    setOpen(false)
  }

  return (
    <div>
      <Typography  color="inherit" onClick={handleClickOpen}>
    create blog
      </Typography>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create blog</DialogTitle>
        <DialogContent>
          <form className='formDiv' onSubmit={handleSubmit}>
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
            <DialogActions>
              <Button id='blogSubmitButton' type="submit">submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BlogForm