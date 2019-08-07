import React, { useState } from 'react'
import { useField } from '../hooks/useField'
import postService from '../services/PostService'

const SubmitBlog = ({ }) => {

  const title = useField('text')
  const author = useField('text')
  const content = useField('text')

  const addPost = async (event) => {
    event.preventDefault()
    const newPost = {
      title: title.value,
      author: author.value,
      content: content.value,
      likes: 0
    }

    postService
      .create(newPost)
      .then(data => {
        title.reset(true);
        author.reset(true);
        content.reset(true);
        window.location.reload(true);
      })
  }

  return (
    <form onSubmit={addPost}>
      <div>Title:
        <input {...title} />
      </div>
      <div>Author:
        <input {...author} />
      </div>
      <div>Content:
        <input {...content} />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default SubmitBlog