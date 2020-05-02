import usersService from '../services/users'
import notifyAndClear from '../utils/notifier'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  case 'UPDATE_USER_BLOGS': {
    const user = state.find(u => u.username === action.username)
    const usersBlogs = user.blogs.concat(action.blog)
    return state.map(u => u.username === action.username ? { ...user, blogs: usersBlogs } : u)
  }
  case 'ADD_USER':
    return state.concat(action.user)
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch (e) {
      notifyAndClear(dispatch, 'couldn\'t load users from server', 5, 'warning')
    }

  }
}

export const updateUserBlogs = (blog, username) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_USER_BLOGS',
      blog,
      username
    })
  }
}

export const addUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'ADD_USER',
      user
    })
  }
}


export default reducer