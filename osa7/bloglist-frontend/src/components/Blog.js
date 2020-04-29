/* eslint-disable linebreak-style */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import Comments from './Comments'
import { Container } from '@material-ui/core'

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
    if(window.confirm(`You are about to delete ${blog.title} by ${blog.author}`)){
      dispatch(removeBlog(blog))
      history.push('/blogs')
    }
  }

  const canDelete = () => {
    if(user && blog.user){
      return blog.user.length > 0 ? user.username === blogUser.username : true
    } else {
      return false
    }
  }

  return(
    <Container maxWidth="sm">
      <div className='blog'>
        <div >
          <h1>{blog.title} {blog.author}</h1>
          <a href={blog.url}>{blog.url}</a>
          <div id='blogLikes'>{blog.likes} likes<button id='blogLikeButton' onClick={() => dispatch(likeBlog(blog))}>like</button></div>
          <div>added by {blogUser.name}</div>
          {canDelete() && <button id='blogDeleteButton' onClick={deletePushed}>remove</button>}
          <Comments blog={blog} />
        </div>
      </div>
    </Container>
  )
}

export default Blog
