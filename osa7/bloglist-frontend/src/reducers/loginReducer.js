import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
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
    userService.setToken(user.token)
    dispatch({ type: 'LOGIN', data: user })
  }
}

export const login = (givenObj) => {
  return async dispatch => {
    try {
      const user = await loginService.login(givenObj)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
      dispatch({ type: 'LOGIN', data: user })
      notifyAndClear(dispatch, `welcome ${user.name}!`)
    } catch (e) {
      e.response.data.error ?
        notifyAndClear(dispatch, e.response.data.error, 15, 'error') :
        notifyAndClear(dispatch, 'Server is not responding', 15, 'error')
    }
  }
}

export const signIn = (user, history) => {
  return async dispatch => {
    try {
      const signedUser = await userService.signIn(user)
      const loggedUser = await loginService.login({ username: user.username, password: user.password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      userService.setToken(loggedUser.token)
      dispatch({ type: 'LOGIN', data: loggedUser })
      dispatch({ type: 'ADD_USER', user: signedUser })
      notifyAndClear(dispatch, `account created ${user.name}!`)
      history.push(`/users/${signedUser.id}`)
    } catch (e) {
      e.response.data.error ?
        notifyAndClear(dispatch, e.response.data.error, 15, 'error') :
        notifyAndClear(dispatch, 'Server is not responding', 15, 'error')
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.resetToken()
    userService.resetToken()
    dispatch({
      type: 'LOGOUT'
    })
    notifyAndClear(dispatch, 'logged out', 5, 'info')
  }
}

export default reducer
