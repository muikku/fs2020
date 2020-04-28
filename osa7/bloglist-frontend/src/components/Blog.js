/* eslint-disable linebreak-style */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const blog = blogs.find(b => b.id === id)

  if(!blog){
    return null
  }

  const blogUser = blog.user[0]

  const likePushed = () => {
    try{
      dispatch(likeBlog(blog))
      dispatch(notify(`${blog.title} + 1 like!`, 5))
    } catch(error){
      dispatch(notify(`there was error liking blog ${blog.title}`, 5))
    }
  }

  const deletePushed = () => {
    if(window.confirm(`You are about to delete ${blog.title} by ${blog.author}`)){
      try{
        dispatch(removeBlog(blog.id))
        dispatch(notify(`${blog.title} deleted!`, 5))
      } catch(error){
        dispatch(notify(`an error occured when deleting ${blog.title}`, 5))
      }
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
    <div className='blog'>
      <div >
        <h1>{blog.title} {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div id='blogLikes'>{blog.likes} likes<button id='blogLikeButton' onClick={likePushed}>like</button></div>
        <div>added by {blogUser.name}</div>
        {canDelete() && <button id='blogDeleteButton' onClick={deletePushed}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
