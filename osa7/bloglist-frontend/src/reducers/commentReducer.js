import blogService from '../services/blogs'
import notifyAndClear from '../utils/notifier'

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
    try{
      const comments = await blogService.getComments()
      dispatch({
        type: 'INIT_COMMENTS',
        comments
      })
    } catch (err){
      notifyAndClear(dispatch, 'couldn\'t load comments from server',5, 'warning')
    }
  }
}

export const createComment = (submittedComment, id) => {
  return async dispatch => {
    try{
      const comment = await blogService.postComment(submittedComment, id)
      dispatch({
        type: 'POST_COMMENT',
        comment
      })
      notifyAndClear(dispatch, 'comment added')
    } catch (e) {
      e.response.data.error ?
        notifyAndClear(dispatch, e.response.data.error, 15, 'error') :
        notifyAndClear(dispatch, 'Server is not responding', 15, 'error')
    }
  }
}

export default reducer