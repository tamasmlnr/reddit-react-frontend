import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import CommentService from '../services/CommentService'
import PostService from '../services/PostService'

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  console.log("post ID", postId);
  useEffect(() => {
    PostService.getPost(postId).then(response => {
      setComments(response.comments)
    })
  }, [])
  console.log("comments", comments);
  return (
    <div>
      <h2>Comments</h2>

      {comments.map(c => <Comment comment={c} key={c._id} ></Comment>)}

    </div>
  )
}

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div class="panel panel-default">
    <div class="panel-body">
        <p class="small"> by {comment.user.username}</p>

        {comment.content}

      </div>
    </div>
  )


}

export default Comments