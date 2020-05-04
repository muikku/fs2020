import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
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
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { Grid } from '@material-ui/core'
/*
  Todo:
  responsive menu
  finish user view
  menu stuff
  signin title
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
        <ResponsiveDrawer />
        <Container>
          <Grid container
            direction="column"
            justify="flex-end"
            alignItems="center" spacing={6}>
            <Grid item>
              <span></span>
            </Grid>
            <Grid item>
              <Switch>
                <Route path='/blogs/:id'> <Blog /> </Route>
                <Route path='/blogs'> <BlogList /> </Route>
                <Route path='/users/:id'> <User /> </Route>
                <Route path='/users'> <UserList /> </Route>
                <Route path='/'> <BlogList /> </Route>
              </Switch>
            </Grid>
          </Grid>
        </Container>
      </BrowserRouter>
    </Container>
  )
}

export default App
