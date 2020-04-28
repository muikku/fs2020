/* eslint-disable linebreak-style */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { createComment } from '../reducers/commentReducer'
import { useParams, useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const comments = useSelector(state => state.comments.filter(c => c.blogId === id))
  const blog = blogs.find(b => b.id === id)
  const comment = useField('text')

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
        history.push('/blogs')
      } catch(error){
        dispatch(notify(`an error occured when deleting ${blog.title}`, 5))
      }
    }
  }

  const handleCommenting = (event) => {
    event.preventDefault()
    try{
      const newComment = {
        comment: comment.value
      }
      dispatch(createComment(newComment, id))
      dispatch(notify(`comment posted to ${blog.title}!`, 5))
      comment.onSubmit()
    } catch (err) {
      dispatch(notify('uuh, ooh, couldn\'t add comment :(', 5))
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
        <div>comments</div>
        <form onSubmit={handleCommenting}>
          <input {...comment} /> <button type="submit">add comment</button>
        </form>
        {comments.map(c => <div key={c.id}>{c.comment}</div>)}
      </div>
    </div>
  )
}

export default Blog
