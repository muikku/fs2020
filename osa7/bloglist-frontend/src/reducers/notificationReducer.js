const reducer = (state = null, action) => {
  switch(action.type) {
  case 'ADD_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return null
  default:
    return state
  }
}

export const notify = (message, time, severity) => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: { message, severity: (severity || 'success') }
    })
    clearTimeout(messageTimeout)
    messageTimeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, (time || 5)* 1000)
  }
}

export const clear = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }
}

let messageTimeout

export default reducer