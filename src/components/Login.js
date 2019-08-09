import React, { useState } from 'react'
import { useField } from '../hooks/useField'
import loginService from '../services/LoginService'


const Login = ({user, setUser}) => {

  const usern = useField('text')
  const pass = useField('password')
  const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usern.value
      const password = pass.value
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      console.log(user);
      // window.location = '/';
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <form onSubmit={handleLogin}>
      <div>Username:
        <input {...usern} />
      </div>
      <div>Password:
        <input {...pass} />
      </div>
      <button type="submit">log in</button>
      {errorMessage}
    </form>
  )
}

export default Login