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
    } catch (err) {
      notifyAndClear(dispatch, 'an error occured while posting comment', 5, 'error')
    }
  }
}

export default reducer