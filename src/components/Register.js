import React from 'react'
import { useField } from '../hooks/useField'
import postService from '../services/PostService'
import userService from '../services/UserService'

const Register = () => {

  const username = useField('text')
  const password = useField('password')

  const register = async (event) => {
    event.preventDefault()
    const newUser = {
      username: username.value,
      password: password.value,
    }

    userService
      .create(newUser)
      .then(data => {
        username.reset(true);
        password.reset(true);
      })
  }

  return (
    <form onSubmit={register}>
      <div>Username:
        <input {...username} />
      </div>
      <div>Password:
        <input {...password} />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default Register