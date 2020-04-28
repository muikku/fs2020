import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const resetToken = () => token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const getComments = async () => {
  const response = await axios.get(`${baseUrl}/all/comments`)
  return response.data
}

const postComment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { getAll, create, update, setToken, remove, resetToken, getComments, postComment }