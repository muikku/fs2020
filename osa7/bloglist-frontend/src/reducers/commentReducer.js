import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_COMMENTS':
    return action.comments
  case 'POST_COMMENT':
    return state.concat(action.comment)
  default:
    return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await blogService.getComments()
    dispatch({
      type: 'INIT_COMMENTS',
      comments
    })
  }
}

export const createComment = (submittedComment, id) => {
  return async dispatch => {
    const comment = await blogService.postComment(submittedComment, id)
    dispatch({
      type: 'POST_COMMENT',
      comment
    })
  }
}

export default reducer