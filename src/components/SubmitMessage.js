import React from 'react'
import { useField } from '../hooks/useField'
import { FormGroup, Button, FormControl } from 'react-bootstrap';
import MessageService from '../services/MessageService';

const SubmitMessage = ({ userTo, userFrom }) => {

  const content = useField('text')

  const addComment = async (event) => {
    event.preventDefault()
    const newMessage = {
      userFrom: userFrom,
      userTo: userTo,
      content: content.value,
      date: Date.now()
    }

    MessageService
      .create(newMessage)
      .then(data => {
        window.location.reload(true);
      })
  }

  return (<>
<h2> Work in progress ;)</h2>
    <form onSubmit={addComment} style={{ padding: '4em 4em 0 4em' }}>
      <FormGroup role="form">
        <FormControl componentClass="textarea" style={{ height: 150, }} {...content} />
        <div className="text-center">
          <Button className="btn btn-dark btn--large centerButton" type="submit">Send new message to {userTo}</Button>
        </div>
      </FormGroup>
    </form>
    </>
  )
}

export default SubmitMessage