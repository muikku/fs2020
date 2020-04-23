const reducer = (state = null, action) => {
  switch(action.type){
  case 'SET_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return null
  default:
    return state
  }
}

export const notify = (message, secs) => {
  return  dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: message
    })
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, secs * 10000)
  }
}

let hideTimer

export default reducer