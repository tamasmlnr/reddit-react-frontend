import React from 'react'
import { useField } from '../hooks/useField'
import CommentService from '../services/CommentService'
import commentService from '../services/CommentService';

const SubmitComment = ({ post }) => {

  const content = useField('text')

  const addComment = async (event) => {
    event.preventDefault()
    const newComment = {
      content: content.value,
      post: post._id
    }

    commentService
      .create(newComment)
      .then(data => {
        // title.reset(true);
        // content.reset(true);
        window.location.reload(true);
      })
  }

  return (
    <form onSubmit={addComment}>
      <div>New comment:
        <input {...content} />
      </div>
      <button type="submit">comment</button>
    </form>
  )
}

export default SubmitPost