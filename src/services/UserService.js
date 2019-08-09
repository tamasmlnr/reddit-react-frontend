import axios from 'axios'
const url = 'http://localhost:3003/api/users'

const create = async newUser => {
  const request = axios.post(url, newUser)
  console.log(newUser);
  const response = await request;
  return response.data;
}

export default {
  create
}