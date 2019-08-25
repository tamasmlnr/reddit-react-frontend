import React from 'react';
import postService from '../services/PostService';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css?v=<?=time();?>'

const DeletePost = (props) => {
  const id = props.id;
  console.log("props1", props);
  const handleDelete = (event) => {
    console.log("props2", props);
    event.preventDefault();
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            postService.deletePost(id);
            props.history.push("/");
          }
        },
        {
          label: 'No'
        }
      ]
    })

  };
  return (<Button className="btn btn-dark btn--large centerButton" type="submit" onClick={handleDelete}>delete</Button>);
};

export default withRouter(DeletePost)