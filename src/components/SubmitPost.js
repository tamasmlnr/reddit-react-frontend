import React from 'react'
import { useField } from '../hooks/useField'
import postService from '../services/PostService'

const SubmitPost = ({ user }) => {

  const title = useField('text')
  const content = useField('text')

  const addPost = async (event) => {
    event.preventDefault()
    const newPost = {
      title: title.value,
      content: content.value,
      likes: 0
    }

    postService
      .create(newPost)
      .then(data => {
        // title.reset(true);
        // content.reset(true);
        window.location.reload(true);
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

export default SubmitPost