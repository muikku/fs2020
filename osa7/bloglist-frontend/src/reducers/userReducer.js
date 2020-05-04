import userService from '../services/users'
import notifyAndClear from '../utils/notifier'
import blogService from '../services/blogs'

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
  case 'REMOVE_USER':
    return state.filter(u => u.id !== action.id)
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
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

export const deleteUser = (user) => {
  return async dispatch => {
    try{
      await userService.remove(user.id)
      dispatch({
        type:'REMOVE_USER',
        id: user.id
      })
      user.blogs.forEach(blog => {
        dispatch({
          type: 'DELETE_BLOG',
          data: blog.id
        })
      })
      window.localStorage.removeItem('loggedUser')
      blogService.resetToken()
      userService.resetToken()
      dispatch({
        type: 'LOGOUT'
      })
      notifyAndClear(dispatch, `User ${user.name} removed.`)
    } catch (e) {
        notifyAndClear(dispatch, e.response.data.error, 15, 'error') 
        notifyAndClear(dispatch, 'Server is not responding', 15, 'error')
    }
  }
}


export default reducer