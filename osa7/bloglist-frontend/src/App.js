import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { loginFromLocalStorage } from './reducers/loginReducer'



const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      dispatch(loginFromLocalStorage(loggedUserJSON))
    }
  },[dispatch])

  const handleBlogSubmit = async (obj) => {
    try{
      dispatch(createBlog(obj))
      dispatch(notify(`a new blog ${obj.title} by ${obj.author} added`, 5))
    } catch(error){
      dispatch(notify('there was a problem, could not add blog', 5))
    }
  }

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

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      {!user
        ? (

          <LoginForm
          />
        )
        : (
          <>
            <Logout />
            <Togglable buttonLabel='new blog'>
              <BlogForm
                createBlog={handleBlogSubmit}
              />
            </Togglable>
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
          </>
        )}
    </div>
  )
}

export default App
