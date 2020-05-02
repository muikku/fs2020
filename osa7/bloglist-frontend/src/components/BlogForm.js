import React, { useState } from 'react'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import  { createBlog } from '../reducers/blogReducer'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { notify } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const user = useSelector(state => state.login)

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

  const handleUnlogged = () => dispatch(notify('login is required to create blogs', 10, 'info'))

  if(!user){
    return(
      <Tooltip title="you must first login to create blogs">
        <span>
          <Button  color="inherit" onClick={handleUnlogged} disabled>
    Create blog
          </Button>
        </span>
      </Tooltip>
    )
  }

  return (
    <div>
      <Button  color="inherit" onClick={handleClickOpen}>
    Create blog
      </Button>
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