/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const enlarged = { display: visible ? '' : 'none',  paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }
  const shrunken = { display: visible ? 'none' : '' }
  const likePushed = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    handleLike(likedBlog)
  }
  const deletePushed = () => {
    if(window.confirm(`You are about to delete ${blog.title} by ${blog.author}`)){
      handleDelete(blog)
    }
  }

  const canDelete = () => {
    if(user && blog.user){
      return blog.user.length > 0 ? (blog.user[0].username) === user.username : true
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
