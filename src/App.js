import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
          <Route path="/post" render={() => <SubmitBlog></SubmitBlog>} />
          {/* <Route path="/posts/:id" render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />
        } /> */}
        </div>
      </Router>
    </>
  )

}

const Posts = ({ posts }) => {
  return (
    <div>
      <h2>Posts</h2>
      <Table dark>
        <tbody>
          {posts.map(p => <Post post={p}></Post>)}
        </tbody>
      </Table>
    </div>
  )
}

const Post = ({ post }) => {
  return <tr key={post.title}>
    <td>
      {post.title}
    </td>
    <td>
      {post.author}
    </td>
    {post.score}
  </tr>
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
