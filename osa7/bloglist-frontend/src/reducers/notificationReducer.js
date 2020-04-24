const reducer = (state = null, action) => {
  switch(action.type) {
  case 'ADD_MESSAGE':
    return action.data.message
  case 'CLEAR_MESSAGE':
    return null
  default:
    return state
  }
}

export const notify = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: { message }
    })
    clearTimeout(messageTimeout)
    messageTimeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, time * 1000)
  }
}

let messageTimeout

export default reducer