import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeComments } from './reducers/commentReducer'
import { loginFromLocalStorage } from './reducers/loginReducer'
import { BrowserRouter, Route,  Switch } from 'react-router-dom'
import UserList from './components/UserList'
import Container from '@material-ui/core/Container'
import AppBar from './components/AppBar'
/*
  Todo:
  persistent menu + icon
  clicking drawer obj closes it
  login and sign in styles
  use more custom hooks, at least for services..
*/
const App = () => {
  const dispatch = useDispatch()

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
    <Container >
      <BrowserRouter>
        <Notification />
        <AppBar/>
        <BlogForm/>
        <Switch>
          <Route path='/blogs/:id'> <Blog /> </Route>
          <Route path='/blogs'> <BlogList /> </Route>
          <Route path='/users/:id'> <User /> </Route>
          <Route path='/users'> <UserList /> </Route>
          <Route path='/'> <BlogList /> </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App
