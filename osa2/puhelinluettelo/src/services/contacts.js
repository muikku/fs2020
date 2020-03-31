import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = (contact) => {
    const req = axios.post(baseUrl, contact)
    return req.then(res => res.data)
}

const update = (id, updateContact) => {
    const req = axios.put(`${baseUrl}/${id}`, updateContact)
    return req.then(res => res.data)
}

export default { getAll, create, update }
