import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const resetToken = () => token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const signIn = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}


export default { getAll, signIn, remove, setToken, resetToken }