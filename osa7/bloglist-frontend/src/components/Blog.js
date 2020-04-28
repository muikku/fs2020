/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const blogUser = blog.user[0]

  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

  const enlarged = { display: visible ? '' : 'none',  paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }
  const shrunken = { display: visible ? 'none' : '' }


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
      <div className='minimized' onClick={toggle} style={shrunken}>{`${blog.title}  ${blog.author}`}</div>
      <div className='maximized' style={enlarged}>
        <div>{blog.title}<button onClick={toggle}>hide</button></div>
        <a href={blog.url}>{blog.url}</a>
        <div id='blogLikes'>likes {blog.likes} <button id='blogLikeButton' onClick={likePushed}>like</button></div>
        <div>{blog.author}</div>
        {canDelete() && <button id='blogDeleteButton' onClick={deletePushed}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
