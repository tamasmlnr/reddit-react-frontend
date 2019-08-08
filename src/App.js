import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SubmitBlog from './components/SubmitPost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'


const Menu = ({ posts, upvote, downvote }) => {
  const padding = {
    paddingRight: 30
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">all posts</Nav.Link>
            <Nav.Link href="/post">new post</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Router>
        <div>
          <Route exact path="/" render={() => <Posts posts={posts} upvote={upvote} downvote={downvote}></Posts>} />
          <Route exact path="/post" render={() => <SubmitBlog></SubmitBlog>} />
          <Route exact path="/posts/:id" render={({ match }) =>
            <SinglePost id={match.params.id} />
          } />
        </div>
      </Router>
    </>
  )

}

const Posts = ({ posts, upvote, downvote }) => {
  return (
    <div>
      <h2>Posts</h2>
      <Table variant="dark">
        <tbody>
          {posts.map(p => <Post post={p} key={p._id} upvote={upvote} downvote={downvote}></Post>)}
        </tbody>
      </Table>
    </div>
  )
}

const Post = ({ post, upvote, downvote }) => {
  return <tr key={post._id}>
    <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
    <td>{post.author}</td>
    <td>
      <FontAwesomeIcon icon={faArrowDown} onClick={() => downvote(post, post._id)} size="xs" color="deepskyblue" />
      {post.score}
      <FontAwesomeIcon icon={faArrowUp} onClick={() => upvote(post, post._id)} size="xs" color="deepskyblue" />
    </td>
  </tr>
}

const SinglePost = ({ id }) => {
  const [singlePost, setSinglePost] = useState([])
  useEffect(() => {
    postService.getPost(id).then(response => setSinglePost(response))
  }, [])
  return (<div>
    <h2>{singlePost.title}</h2>
    by {singlePost.author}
    <p></p>
    {singlePost.content}
  </div>
  )
}

function App() {

  const [posts, setPosts] = useState([])
  const [updates, setUpdates] = useState(0)

  useEffect(() => {
    postService.getAll().then(response => setPosts(response))
  }, [])

  const downvote = (post, id) => {
    const changedPost = { ...post, score: post.score - 1 }

    postService
      .updatePost(id, changedPost).then(returnedPost => {
        console.log(returnedPost);
        setPosts(posts.map(post => post._id != id ? post : returnedPost))
        setUpdates(updates + 1)
      }
      )
  }

  const upvote = (post, id) => {
    const changedPost = { ...post, score: post.score + 1 }
    postService
      .updatePost(id, changedPost).then(returnedPost => {
        setPosts(posts.map(post => post._id !== id ? post : returnedPost))
      })
  }

  const updateAndSetPosts = (id, changedPost) => {
    postService
      .updatePost(id, changedPost).then(returnedPost => {
        setPosts(posts.map(post => post.id !== id ? post : returnedPost))
      })
  }

  return (
    <>
      <Menu posts={posts} upvote={upvote} downvote={downvote}></Menu>
      {updates}
    </>
  );
}

export default App;
