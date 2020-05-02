import { Link } from 'react-router-dom'
import React from 'react'
import Logout from './Logout'
import LoginForm from './LoginForm'
import SignInForm from './SignInForm'
import BlogForm from './BlogForm'
import { AppBar, Button, Toolbar, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Menu = () => {
  const user = useSelector(state => state.login)
  const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
  }))
  const classes = useStyles()
  return(
    <div>
      {/*just a quick way to have enougn space under menubar. Maybe something more elegant later.*/}
      <div className={classes.toolbar} /><div className={classes.toolbar} />
      <AppBar position="fixed">
        <Toolbar >
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
            <>
              <LoginForm/>
              <SignInForm />
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu