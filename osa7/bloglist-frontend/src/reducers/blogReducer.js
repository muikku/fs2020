import blogService from '../services/blogs'

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
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    console.log('blog: ', returnedBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data: returnedBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: returnedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default reducer