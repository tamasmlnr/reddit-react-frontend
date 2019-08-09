import React, {useState} from 'react'
import { useField } from '../hooks/useField'
import userService from '../services/UserService'

const Register = () => {

  const username = useField('text')
  const password = useField('password')
  const [errorMessage, setErrorMessage] = useState('')

  const register = async (event) => {
    event.preventDefault()
    const newUser = {
      username: username.value,
      password: password.value,
    }

    userService
      .create(newUser)
      .then(data => {
        username.resetValue(true);
        password.resetValue(true);
        setErrorMessage("Registration successful!")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage("Unable to register", error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <button type="submit">register</button>
      {errorMessage}
    </form>
  )
}

export default Register