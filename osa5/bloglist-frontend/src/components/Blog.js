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
      blog.user.length > 0 ? blog.user[0].username === user.username : true
    } else {
      return false
    }
  }

  return(
    <>
      <div className='minimized' onClick={toggle} style={shrunken}>{`${blog.title}  ${blog.author}`}</div>
      <div className='maximized' style={enlarged}>
        <div>{blog.title}<button onClick={toggle}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={likePushed}>like</button></div>
        <div>{blog.author}</div>
        {canDelete() && <button onClick={deletePushed}>remove</button>}
      </div>
    </>
  )
}

export default Blog
