/* eslint-disable no-use-before-define */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { fade, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 5,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    textIndent: 48,
    color: 'white',
    padding: theme.spacing(8, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))
export default function Search() {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const combined = blogs.concat(users)
  const history = useHistory()
  const classes = useStyles()
  const handleOnChange = ({ target }) => {
    const blogFound = blogs.find(b => b.title === target.value)
    const userFound = users.find(u => u.username === target.value)
    if(blogFound){
      history.push(`/blogs/${blogFound.id}`)
    }
    if(userFound){
      history.push(`/users/${userFound.id}`)
    }
  }

  return (
    <Autocomplete
      freeSolo
      id="autocomplete-search"
      disableClearable
      options={combined}
      getOptionLabel={ option => option.title || option.username || option}
      classes={{ input: classes.inputInput, root: classes.root }}
      renderInput={(params) => (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, type: 'search' }}
            onSelect={handleOnChange}
          />
        </div>
      )}
    />
  )
}

