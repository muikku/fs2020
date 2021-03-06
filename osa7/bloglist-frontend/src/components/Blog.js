/* eslint-disable linebreak-style */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import Comments from './Comments'
import { Container, Button, Typography, Grid, Divider, Tooltip } from '@material-ui/core'
import { ThumbUp, Delete } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Confirm from './Confirm'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const blog = blogs.find(b => b.id === id)

  if(!blog){
    return null
  }

  const blogUser = blog.user[0]

  const deletePushed = () => {
    dispatch(removeBlog(blog))
    history.push('/blogs')
  }

  const canDelete = () => {
    if(user && blog.user){
      return blog.user.length > 0 ? user.username === blogUser.username : true
    } else {
      return false
    }
  }

  return(
    <Container>
      <Grid container direction="column" justify="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h2">{blog.title} {blog.author}</Typography>
          <a href={blog.url}>{<Typography>{blog.url}</Typography>}</a>
          <Typography>added by <Link  to={`/users/${blogUser.id}`}>{blogUser.name} </Link></Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Button variant="contained" startIcon={<ThumbUp/>}color="inherit" id='blogLikeButton' onClick={() => dispatch(likeBlog(blog))}>{blog.likes} likes</Button>

            {canDelete() ?
              <Button variant="outlined" color="secondary" startIcon={<Delete/>} >
                <Confirm
                  buttonText="Remove"
                  dialogTitle="Delete blog?"
                  dialogText={`Just confirming that you really want to delete ${blog.title} by ${blog.author}.\nThis action cannot be reverted.`}
                  confirmButtonName="Remove"
                  cancelButtonName="Cancel"
                  action={deletePushed}/>
              </Button>
              :
              <Tooltip title="only owner can delete">
                <span>
                  <Button variant="outlined" startIcon={<Delete/>} disabled>Remove</Button>
                </span>
              </Tooltip>}

          </Grid>
        </Grid>
        <Grid item>
          <Divider spacing={3}/>
        </Grid>
        <Grid item>
          <Comments blog={blog} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Blog
