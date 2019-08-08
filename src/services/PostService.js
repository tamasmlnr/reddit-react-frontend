import axios from 'axios'
const url = 'http://localhost:3003/api/posts'

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

const updatePost = async (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  const response = await request
  return response.data
}

const create = async newPost => {
  const request = axios.post(url, newPost)
  console.log(newPost);
  const response = await request;
  return response.data;
}

export default {
  getAll,
  getPost,
  updatePost,
  create
}