import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import { Menu } from './components/Menu';
import CommentService from './services/CommentService';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService.getAll().then(response => setPosts(response))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('postUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      postService.setToken(user.token);
      CommentService.setToken(user.token);
    }
  }, []);
  const logOut = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

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
      <Menu posts={posts} upvote={upvote} downvote={downvote} user={user} setUser={setUser} logOut={logOut}></Menu>
    </>
  );
}

export default App;
