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

  const savePost = (post, id) => {
    if (!post.savedBy.includes(user.id)) {
      const changedPost = {
        ...post,
        savedBy: post.savedBy.concat(user.id)
      }
      updateAndSetPosts(id, changedPost)
    }
    else {
      unsavePost(post, id)
    }
  }

  const unsavePost = (post, id) => {
    console.log("unsave");
    const changedPost = {
      ...post,
      savedBy: post.savedBy.filter(uId => uId !== user.id)
    }
    updateAndSetPosts(id, changedPost)
  }

  const downvote = (post, id) => {
    if (post.upvotes.includes(user.id)) {
      undoUpvote(post, id);
    }
    else {
      post.downvotes.includes(user.id) ? undoDownvote(post, id) : doDownvote(post, id);
    }
  }

  const doDownvote = (post, id) => {
    const changedPost = {
      ...post,
      score: post.score - 1,
      downvotes: post.downvotes.concat(user.id)
    }
    updateAndSetPosts(id, changedPost)
  }

  const undoDownvote = (post, id) => {
    const changedPost = {
      ...post,
      score: post.score + 1,
      downvotes:
        post.downvotes.filter(uId => uId !== user.id)
    }
    updateAndSetPosts(id, changedPost)
  }

  const upvote = (post, id) => {
    if (post.downvotes.includes(user.id)) {
      undoDownvote(post, id);
    }
    else {
      post.upvotes.includes(user.id) ? undoUpvote(post, id) : doUpvote(post, id);
    }
  }

  const doUpvote = (post, id) => {
    const changedPost = {
      ...post,
      score: post.score + 1,
      upvotes: post.upvotes.concat(user.id)
    }
    updateAndSetPosts(id, changedPost)
  }

  const undoUpvote = (post, id) => {
    const changedPost = {
      ...post,
      score: post.score - 1,
      upvotes: post.upvotes.filter(uId => uId !== user.id)
    }
    updateAndSetPosts(id, changedPost)
  }

  const updateAndSetPosts = (id, changedPost) => {
    return postService
      .updatePost(id, changedPost).then(returnedPost => {
        setPosts(posts.map(post => post._id !== id ? post : returnedPost))
      })
  }

  return (
    <>
      <Menu posts={posts} upvote={upvote} downvote={downvote} savePost={savePost} user={user} setUser={setUser} logOut={logOut}></Menu>
    </>
  );
}

export default App;
