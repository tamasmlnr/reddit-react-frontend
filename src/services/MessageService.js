import axios from 'axios'
const url = 'http://localhost:3003/api/messages'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(url)
  const response = await request;
  return response.data;
}

const getMessage = async id => {
  const request = axios.get(`${url}/${id}`)
  const response = await request;
  return response.data;
}

const getMessageByUser = async user => {
  if (user) {
    const id = user.id;
    const request = axios.get(`${url}/${id}`)
    const response = await request;
    return response.data;
  }
}

const create = async newMessage => {
  console.log("token", token);
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(url, newMessage, config)
  const response = await request;
  return response;
}

export default {
  setToken,
  getAll,
  getMessage,
  getMessageByUser,
  create
}