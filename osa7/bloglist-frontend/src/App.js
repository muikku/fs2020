import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeComments } from './reducers/commentReducer'
import { loginFromLocalStorage } from './reducers/loginReducer'
import { BrowserRouter, Route,  Switch } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeComments())
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

        <Notification />
        {!user
          ? (

            <LoginForm
            />
          )
          : (
            <div>
              <Menu />
              <Switch>
                <Route path='/blogs/:id'><Blog /></Route>
                <Route path='/blogs'><BlogList /></Route>
                <Route path='/create'> <BlogForm /></Route>
                <Route path='/users/:id'><User /> </Route>
                <Route path='/users'><UserList/> </Route>
              </Switch>
            </div>
          )}
      </div>
    </BrowserRouter>
  )
}

export default App
