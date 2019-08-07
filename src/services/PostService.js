import axios from 'axios'
const url = 'http://localhost:3001/posts'

const getAll = async () => {
  const request = axios.get(url)
  const response = await request;
  return response.data;
}

const create = async newPost => {
  const request = axios.post(url, newPost)
  const response = await request;
  return response.data;
}

const deletePerson = async id => {
  const urlToDelete = `${url}/${id}`
  const request = axios.delete(urlToDelete)
  const response = await request;
  return response.data;
}

const modifyPerson = async (newPost, idToChange) => {
  const request = axios.put(`${url}/${idToChange}`, newPost)
  const response = await request;
  return response.data;
}

export default {
  getAll,
  create,
  deletePerson,
  modifyPerson
}