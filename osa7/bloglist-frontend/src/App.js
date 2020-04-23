import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      dispatch(notify('Welcome!'), 5)
    } catch (exception) {
      dispatch(notify('wrong username or password'), 5)
    }
  }

  const handleBlogSubmit = async (obj) => {
    try{
      const blog = await blogService.create(obj)
      setBlogs(blogs.concat(blog))
      dispatch(notify(`a new blog ${blog.title} by ${blog.author} added`), 5)
    } catch(error){
      dispatch(notify('there was a problem, could not add blog'), 5)
    }
  }

  const handleLiking = async (obj) => {
    try{
      const updatedBlog = await blogService.update(obj.id, obj)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
      dispatch(notify(`${updatedBlog.title} + 1 like!`), 5)
    } catch(error){
      dispatch(notify(`there was error liking blog ${obj.title}`), 5)
    }
  }

  const handleDeleting = async (obj) => {
    try{
      await blogService.remove(obj.id)
      setBlogs(blogs.filter(b => b.id !== obj.id))
      dispatch(notify(`${obj.title} deleted!`), 5)
    } catch(error){
      dispatch(notify(`an error occured when deleting ${obj.title}`), 5)
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
