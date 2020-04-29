import blogService from '../services/blogs'
import notifyAndClear from '../utils/notifier'


const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'LIKE_BLOG':
    return state.map(b => b.id === action.data.id ? action.data : b)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (e) {
      notifyAndClear(dispatch, 'couldn\'t load blogs from server', 5, 'warning')
    }

  }
}

export const createBlog = (blog, history) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data: returnedBlog
      })
      notifyAndClear(dispatch, `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      history.push(`/blogs/${returnedBlog.id}`)
    } catch (e) {
      notifyAndClear(dispatch,`an error occured while posting blog ${blog.title}`, 5, 'error')
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.update(blog.id, likedBlog)
      dispatch({
        type: 'LIKE_BLOG',
        data: returnedBlog
      })
      notifyAndClear(dispatch,`liked ${returnedBlog.title}!`)
    } catch (error) {
      notifyAndClear(dispatch,`an error occured while liking blog ${blog.title}`, 5, 'error')
    }

  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog.id
      })
      notifyAndClear(dispatch, `${blog.title} deleted!`)
    } catch (e) {
      notifyAndClear(dispatch, `an error occured when deleting ${blog.title}`, 5, 'error')
    }

  }
}

export default reducer