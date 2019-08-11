import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import Table from 'react-bootstrap/Table';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Panel from 'react-bootstrap/lib/Panel'
import { Button } from 'react-bootstrap';

import {
  withRouter
} from 'react-router-dom'
import { Menu } from './components/Menu';


function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService.getAll().then(response => setPosts(response))
  }, [])

  const downvote = (post, id) => {
    const changedPost = { ...post, score: post.score - 1 }
    updateAndSetPosts(id, changedPost)
  }

  const upvote = (post, id) => {
    const changedPost = { ...post, score: post.score + 1 }
    updateAndSetPosts(id, changedPost)
  }

  const updateAndSetPosts = (id, changedPost) => {
    postService
      .updatePost(id, changedPost).then(returnedPost => {
        setPosts(posts.map(post => post._id !== id ? post : returnedPost))
      })
  }

  return (
    <>
      <Menu posts={posts} upvote={upvote} downvote={downvote}></Menu>
    </>
  );
}

export default App;
