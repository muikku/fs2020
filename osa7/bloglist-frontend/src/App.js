import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
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
import Container from '@material-ui/core/Container'
/*
  Todo:
  responsive menu
  bug: editing blog makes state to lose its creator
  sign in
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
        <Menu />
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
