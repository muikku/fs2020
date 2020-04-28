import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { loginFromLocalStorage } from './reducers/loginReducer'
import { BrowserRouter, Route,  Switch } from 'react-router-dom'

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
    <BrowserRouter>
      <div>
        <h2>blogs</h2>
        <Menu />

        <Notification />

        {!user
          ? (

            <LoginForm
            />
          )
          : (
            <Switch>
              <Route path='/create'> <BlogForm /></Route>
              <Route path='/blogs'><BlogList /></Route>
              <Route path='/'><Logout /></Route>
            </Switch>
          )}
      </div>
    </BrowserRouter>
  )
}

export default App
