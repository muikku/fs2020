import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, fade, makeStyles } from '@material-ui/core'
import {  AccountCircle } from '@material-ui/icons/'
import PeopleIcon from '@material-ui/icons/People'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import LoginForm from './LoginForm'
import SignInForm from './SignInForm'
import { useSelector } from 'react-redux'
import RemoveUserButton from './RemoveUserButton'
import LoggedInText from './LoggedInText'
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import Search from './Search'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: 25,
    spacing: 700
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: theme.mixins.toolbar,
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const user = useSelector(state => state.login)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }


  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ?
        <div>
          <LoggedInText handleClick={handleMenuClose}/>
          <Logout handleClick={handleMenuClose}/>
          <RemoveUserButton handleClick={handleMenuClose}/>
        </div>
        :
        <div>
          <LoginForm handleClick={handleMenuClose}/>
          <SignInForm handleClick={handleMenuClose}/>
        </div>
      }
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <div className={classes.toolbar} />
      <AppBar position="fixed" >
        <Toolbar>
          <div className={classes.sectionMobile}>
            <SwipeableTemporaryDrawer
              styleThing={classes.menuButton}
            />
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            Blogs
          </Typography>

          <Search/>

          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" component={Link} to="/blogs">
              <LibraryBooksIcon/> <Typography>Blogs</Typography>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/users">
              <PeopleIcon /> <Typography>People</Typography>
            </IconButton>
          </div>
          <div className={classes.grow} />
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
