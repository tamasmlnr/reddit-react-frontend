import React from 'react'
import { useField } from '../hooks/useField'
import postService from '../services/PostService'
import { withRouter } from 'react-router-dom';

const SubmitPost = (props) => {

  const title = useField('text')
  const content = useField('text')

  const addPost = async (event) => {
    event.preventDefault()
    const newPost = {
      title: title.value,
      content: content.value
    }

    postService
      .create(newPost)
      .then(response => {
        props.history.push(`posts/${response.data._id}`)
      })
  }

  return (
    <form onSubmit={addPost}>
      <div>Title:
        <input {...title} />
      </div>
      <div>Content:
        <input {...content} />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default withRouter(SubmitPost)