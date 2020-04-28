import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { loginFromLocalStorage } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
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
              <BlogForm />
            </Togglable>
            <BlogList />
          </>
        )}
    </div>
  )
}

export default App
