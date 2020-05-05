import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import LoginForm from './LoginForm'
import SignInForm from './SignInForm'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import RemoveUserButton from './RemoveUserButton'
import PeopleIcon from '@material-ui/icons/People'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})


export default function SwipeableTemporaryDrawer() {

  const user = useSelector(state => state.login)
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ text: 'blogs', to: '/blogs', icon:  <LibraryBooksIcon/> },
          { text: 'users', to: '/users', icon:  <PeopleIcon/> }].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {user ?
          <>
            <ListItem button key="blogform">
              <BlogForm/>
            </ListItem>
            <ListItem button key="logout">
              <Logout />
            </ListItem>
            <ListItem button key="removeuserbutton">
              <RemoveUserButton/>
            </ListItem>
          </>
          :
          <>
            <ListItem button key="loginform">
              <LoginForm/>
            </ListItem>
            <ListItem button key="signinform">
              <SignInForm />
            </ListItem>
          </>
        }
      </List>
    </div>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  )
}
