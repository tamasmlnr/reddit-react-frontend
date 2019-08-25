import axios from 'axios'
const url = 'http://localhost:3003/api/posts'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(url)
  const response = await request;
  return response.data;
}

const getPost = async id => {
  const request = axios.get(`${url}/${id}`)
  const response = await request;
  return response.data;
}

const deletePost = async id => {
  console.log("delete id" , id);
  const request = axios.delete(`${url}/${id}`)
  const response = await request
  return response.data
}

const updatePost = async (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  const response = await request
  return response.data
}

const create = async newPost => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(url, newPost, config)
  const response = await request;
  return response;
}

export default {
  setToken,
  getAll,
  getPost,
  updatePost,
  deletePost,
  create
}