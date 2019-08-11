import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CommentService from '../services/CommentService'
import PostService from '../services/PostService'

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  console.log("post ID", postId);
  useEffect(() => {
    PostService.getPost(postId).then(response => {
      console.log("comments", comments);  
      setComments(response.comments)
    })
  }, [])
  return (
    <div>
      <h2>Comments</h2>

      {comments.reverse().map(c => <Comment comment={c} key={c._id} ></Comment>)}

    </div>
  )
}

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div class="container">
    <Card bg="dark" text="white" style={{ margin: '2em' }}>
       <Card.Header style={{height:'2em', padding:'4px'}}> {comment.user.username}</Card.Header>

        {comment.content}

        </Card>
        </div>
  )


}

export default Comments