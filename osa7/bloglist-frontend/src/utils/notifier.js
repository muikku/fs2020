export const notifyAndClear = (dispatch, message, time, severity) => {
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

let messageTimeout

export default notifyAndClear