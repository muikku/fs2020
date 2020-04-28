import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import  { likeBlog, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)

  const handleLiking = async (obj) => {
    try{
      dispatch(likeBlog(obj))
      dispatch(notify(`${obj.title} + 1 like!`, 5))
    } catch(error){
      dispatch(notify(`there was error liking blog ${obj.title}`, 5))
    }
  }

  const handleDeleting = async (obj) => {
    try{
      dispatch(removeBlog(obj.id))
      dispatch(notify(`${obj.title} deleted!`, 5))
    } catch(error){
      dispatch(notify(`an error occured when deleting ${obj.title}`, 5))
    }
  }
  return(
    <div id="blogs">
      {blogs.sort((a, b) => b.likes - a.likes).map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLiking}
          handleDelete={handleDeleting}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogList