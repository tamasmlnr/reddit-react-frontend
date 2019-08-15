import React from 'react'
import { useField } from '../hooks/useField'
import { FormGroup, Button, FormControl } from 'react-bootstrap';
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
        window.location.reload(true);
      })
  }

  return (

<form onSubmit={addComment} style={{ padding: '0 4em 0 4em' }}>
  <FormGroup role="form">
  <FormControl componentClass="textarea" style={{ height: 150,}} {...content}/>
  <div className="text-center">
    <Button className="btn btn-dark btn--large centerButton" type="submit">Submit new comment</Button>
    </div>
  </FormGroup>
</form>
  )
}

export default SubmitComment