import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(notify('Welcome!', 5))
    } catch (exception) {
      dispatch(notify('wrong username or password', 5))
    }
  }

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

  const logoutPushed = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      {!user
        ? (

          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        )
        : (
          <>
            <Logout name={user.name} handleLogout={logoutPushed}/>
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
