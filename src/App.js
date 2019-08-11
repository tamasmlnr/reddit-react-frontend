import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import Table from 'react-bootstrap/Table';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Panel from 'react-bootstrap/lib/Panel'
import { Navbar, Nav, Card, Form, FormControl, Button } from 'react-bootstrap';
import SubmitPost from './components/SubmitPost'
import Register from './components/Register'
import Comments from './components/Comments'
import Login from './components/Login'
import SubmitComment from './components/SubmitComment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import CommentService from './services/CommentService';


const Menu = ({ posts, upvote, downvote }) => {
  //TODO Refactor: move non-menu items to the App component
  const [user, setUser] = useState(null)
  const [searchWord, setSearchWord] = useState('')

  const padding = {
    paddingRight: 30
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('postUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postService.setToken(user.token)
      CommentService.setToken(user.token)
    }
  }, [])


  const logOut = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
    console.log("yee");
  }

  const handleSearch = (event) => {
    setSearchWord(event.target.value);
  }

  const doNothing = function (e) {
    e.preventDefault();
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="reddit, kinda" width="25px" />
          <Nav className="mr-auto">
            <Nav.Link href="/">all posts</Nav.Link>
            {user && <Nav.Link href="/post">new post</Nav.Link>}
            <Form onSubmit={doNothing}>
              <FormControl type="text" placeholder="Search posts" className=" mr-sm-2" style={{ fontSize: '12px' }} onChange={handleSearch} />
            </Form>
          </Nav>

          {user == null ?
            <Nav className="justify-content-end" activeKey="/home">
              <Nav.Item>
                <Nav.Link className="nav navbar-nav navbar-right" href="/register">register</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="nav navbar-nav navbar-right" href="/login">login</Nav.Link>
              </Nav.Item>
            </Nav>
            :
            <Nav>
              <Nav.Link eventKey="disabled" disabled>
                Welcome, {user.username}!
              </Nav.Link>
              <Nav.Link className="nav navbar-nav navbar-right" href="/logout" onClick={logOut} >log out</Nav.Link></Nav>
          }
        </Navbar.Collapse>
      </Navbar>

      <Router>
        <div>
          <Route exact path="/" render={() => <Posts posts={posts} upvote={upvote} downvote={downvote} searchWord={searchWord}></Posts>} />
          <Route exact path="/register" render={() => <Register></Register>} />
          <Route exact path="/login" render={() => <Login user={user} setUser={setUser}></Login>} />
          <Route exact path="/logout" render={() => <Redirect to='/' />} />
          <Route exact path="/post" render={() => <SubmitPost user={user}></SubmitPost>} />
          <Route exact path="/posts/:id" render={({ match }) =>
            <SinglePost id={match.params.id} />
          } />
        </div>
      </Router>
    </>
  )
}

const Posts = ({ posts, upvote, downvote, searchWord }) => {
  let filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase()))
  return (filteredPosts.length === 0 ? <div class="text-center" style={{padding: '4em'}}>No results found! </div>:
    <div class="container" style={{ paddingTop: '4em' }}>
      {filteredPosts.map(p => <Post post={p} key={p._id} upvote={upvote} downvote={downvote}></Post>)}
    </div>
  )
}

const Post = ({ post, upvote, downvote }) => {
  return (
    <div class="post">
      <aside class="left-sidebar">
        <FontAwesomeIcon icon={faArrowUp} onClick={() => upvote(post, post._id)} size="xs" color="deepskyblue" /><br />
        {post.score}<br />
        <FontAwesomeIcon icon={faArrowDown} onClick={() => downvote(post, post._id)} size="xs" color="deepskyblue" /><br />
      </aside>
      <div class="centered"><Link to={`/posts/${post._id}`}><h6>{post.title}</h6></Link>
        <div class="small">by {post.author} on {post.date.substring(0, 10)}</div></div>
      {post.comments.length} comments
  </div>)
}

const SinglePost = ({ id }) => {
  const [singlePost, setSinglePost] = useState([])
  useEffect(() => {
    postService.getPost(id).then(response => setSinglePost(response))
  }, [])
  return (

    <div class="container">
      <Card bg="dark" text="white" style={{ margin: '4em' }}>
        <Card.Header><Card.Title>{singlePost.title}</Card.Title>          by {singlePost.author}</Card.Header>
        <Card.Body>
          {singlePost.content}
        </Card.Body>
      </Card>
      <SubmitComment post={singlePost}></SubmitComment>
      {singlePost._id && <Comments postId={singlePost._id}></Comments>}
    </div>
  )
}

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
