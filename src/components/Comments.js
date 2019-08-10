import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import CommentService from '../services/CommentService'
import PostService from '../services/PostService'

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  console.log("post ID",postId);
  useEffect(() => {
    PostService.getPost(postId).then(response => {
      setComments(response.comments)})
  }, [])
  console.log("comments",comments);
  return (
    <div>
      <h2>Comments</h2>
      <Table variant="dark">
        <tbody>
          {comments.map(c => <Comment comment={c} key={c._id} ></Comment>)}
        </tbody>
      </Table>
    </div>
  )
}

const Comment = ({ comment }) => {
  return <tr key={comment._id}>
    <td>{comment.user}</td>
    <td>
      {comment.content}
    </td>
  </tr>

  return (<div>{comment.content}</div>)
}

export default Comments