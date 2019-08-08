import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SubmitBlog from './components/SubmitPost'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'


const Menu = ({ posts }) => {
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
          <Route exact path="/" render={() => <Posts posts={posts}></Posts>} />
          <Route exact path="/post" render={() => <SubmitBlog></SubmitBlog>} />
          <Route exact path="/posts/:id" render={({ match }) =>
            <SinglePost id={match.params.id} />
          } />
        </div>
      </Router>
    </>
  )

}

const Posts = ({ posts }) => {
  return (
    <div>
      <h2>Posts</h2>
      <Table variant="dark">
        <tbody>
          {posts.map(p => <Post post={p} key={p._id}></Post>)}
        </tbody>
      </Table>
    </div>
  )
}

const Post = ({ post }) => {
  return <tr key={post._id}>
    <td><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
    <td>{post.author}</td>
    <td>{post.score}</td>
  </tr>
}

const SinglePost = ({ id }) => {
  const [singlePost, setSinglePost] = useState([])
  useEffect(() => {
    postService.getPost(id).then(response => setSinglePost(response))
  }, [])
  return (
    <h2>{singlePost.title}</h2>)
}

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService.getAll().then(response => setPosts(response))
  }, [])


  return (
    <>
      <Menu posts={posts}></Menu>
    </>
  );
}

export default App;
