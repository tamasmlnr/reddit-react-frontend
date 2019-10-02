import axios from 'axios'
const url = 'http://localhost:3003/api/comment'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(url)
  const response = await request;
  return response.data;
}

const getComment = async id => {
  console.log("Comment service ID",id);
  const request = axios.get(`${url}/${id}`)
  const response = await request;
  console.log(response.data);
  return response.data;
}

const updateComment = async (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  const response = await request
  return response.data
}

const create = async newComment => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(url, newComment, config)
  const response = await request;
  return response.data;
}

export default {
  setToken,
  getAll,
  getComment,
  updateComment,
  create
}