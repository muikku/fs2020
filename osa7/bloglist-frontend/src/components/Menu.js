import { Link } from 'react-router-dom'
import React from 'react'
import Logout from './Logout'
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
          <Button color="inherit" component={Link} to="/create">
            create blog
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user ?
            <Logout />
            :
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          }
        </Toolbar>
      </AppBar>



    </div>
  )
}

export default Menu