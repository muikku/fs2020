import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Menu from './components/Menu'
import User from './components/User'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loginFromLocalStorage } from './reducers/loginReducer'
import { BrowserRouter, Route,  Switch } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
              <Route path='/blogs'><BlogList /></Route>
              <Route path='/create'> <BlogForm /></Route>
              <Route path='/users/:id'><User /> </Route>
              <Route path='/users'><UserList/> </Route>
              <Route path='/'><Logout /></Route>
            </Switch>
          )}
      </div>
    </BrowserRouter>
  )
}

export default App
