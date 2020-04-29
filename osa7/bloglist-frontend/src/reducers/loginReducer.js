import loginService from '../services/login'
import blogService from '../services/blogs'
import notifyAndClear from '../utils/notifier'

const reducer = (state = null, action) => {
  switch(action.type){
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null

  default:
    return state
  }
}

export const loginFromLocalStorage = (userFromLocalStorage) => {
  return dispatch => {
    const user = JSON.parse(userFromLocalStorage)
    blogService.setToken(user.token)
    dispatch({ type: 'LOGIN', data: user })
  }
}

export const login = (givenObj) => {
  return async dispatch => {
    try {
      const user = await loginService.login(givenObj)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', data: user })
      notifyAndClear(dispatch, `welcome ${user.name}!`)
    } catch (e) {
      notifyAndClear(dispatch, 'connection error while trying to login', 5, 'warning')
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.resetToken()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer
