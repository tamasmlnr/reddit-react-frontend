import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import MessageService from '../services/MessageService'

const Messages = ({ userTo }) => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    MessageService.getMessage(userTo).then(response => {
      setMessages(response.messages)
    })
  }, [])
  return (
    <div>
      <h2>Messages</h2>
      {messages.reverse().map(m => <Message message={m} key={m._id} ></Message>)}
    </div>
  )
}

const Message = ({ message }) => {
  return (
    <div class="container">
      <Card bg="dark" text="white" style={{ margin: '2em' }}>
        <Card.Header style={{ height: '2em', padding: '4px' }}> {message.userFrom.username}
          <span class="small" style={{ float: 'right' }}>{message.date.substring(0, 10)}</span></Card.Header>

        {message.content}

      </Card>
    </div>
  )


}

export default Messages