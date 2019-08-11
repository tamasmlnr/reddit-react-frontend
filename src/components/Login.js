import React, { useState } from 'react'
import { useField } from '../hooks/useField'
import loginService from '../services/LoginService'
import postService from '../services/PostService'
import CommentService from '../services/CommentService'
import { withRouter } from 'react-router-dom';


const Login = (props) => {

  const user = props.user
  const setUser = props.setUser

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
      window.localStorage.setItem(
        'postUser', JSON.stringify(user)
      )
      postService.setToken(user.token)
      CommentService.setToken(user.token)
      props.history.push("/")
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

export default withRouter(Login)