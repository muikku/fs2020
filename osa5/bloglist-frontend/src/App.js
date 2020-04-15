import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
    } catch (exception) {
      notify('wrong username or password')
    }
  }

  const handleBlogSubmit = async (obj) => {
    try{
      const blog = await blogService.create(obj)
      setBlogs(blogs.concat(blog))
      notify(`a new blog ${blog.title} by ${blog.author} added`)
    } catch(error){
      notify('there was a problem, could not add blog')
    }
  }

  const handleLiking = async (obj) => {
    try{
      const updatedBlog = await blogService.update(obj.id, obj)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
      notify(`${updatedBlog.title} + 1 like!`)
    } catch(error){
      notify(`there was error liking blog ${obj.title}`)
    }
  }

  const handleDeleting = async (obj) => {
    try{
      await blogService.remove(obj.id)
      setBlogs(blogs.filter(b => b.id !== obj.id))
      notify(`${obj.title} deleted!`)
    } catch(error){
      notify(`an error occured when deleting ${obj.title}`)
    }
  }

  const logoutPushed = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const notify = (message) => {
    clearTimeout()
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification message={notification}/>}

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
            <div>
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
