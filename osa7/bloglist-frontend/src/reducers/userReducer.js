import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  case 'UPDATE_USER_BLOGS':
    return state.map(u => u.username === action.username ? { ...u, blogs: u.blogs.concat(action.blog) } : u)
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}
/* ei toimi vielä */
export const updateUserBlogs = (username, blog) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_USER_BLOGS',
      data: blog,
      username
    })
  }
}


export default reducer