import { Link } from 'react-router-dom'
import React from 'react'
import Logout from './Logout'
import { AppBar, Button, Toolbar } from '@material-ui/core'

const Menu = () => {
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

          <Logout />
        </Toolbar>


      </AppBar>



    </div>
  )
}

export default Menu