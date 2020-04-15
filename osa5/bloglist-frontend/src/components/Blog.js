/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const enlarged = { display: visible ? '' : 'none',  paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }
  const shrunken = { display: visible ? 'none' : '' }
  return(
    <>
      <div onClick={toggle} style={shrunken}>{`${blog.title}  ${blog.author}`}</div>
      <div style={enlarged}>
        <div>{blog.title}<button onClick={toggle}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    </>
  )
}

export default Blog
