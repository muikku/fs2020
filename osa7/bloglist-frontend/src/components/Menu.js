import { Link } from 'react-router-dom'
import React from 'react'
import Logout from './Logout'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Menu = () => {
  const user = useSelector(state => state.login)
  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/blogs">
            blogs
          </Button>
          <BlogForm/>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user ?
            <Logout />
            :
            <LoginForm/>
          }
        </Toolbar>
      </AppBar>



    </div>
  )
}

export default Menu