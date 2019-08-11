import React, { useState, useEffect } from 'react';
import postService from '../services/PostService';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import SubmitPost from './SubmitPost';
import Register from './Register';
import Login from './Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CommentService from '../services/CommentService';
import { Posts, SinglePost } from "./Posts";
export const Menu = ({ posts, upvote, downvote }) => {
  //TODO Refactor: move non-menu items to the App component
  const [user, setUser] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const padding = {
    paddingRight: 30
  };
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
    console.log("yee");
  };
  const handleSearch = (event) => {
    setSearchWord(event.target.value);
  };
  const doNothing = function (e) {
    e.preventDefault();
  };
  return (<>
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
            <Nav.Link className="nav navbar-nav navbar-right" href="/logout" onClick={logOut}>log out</Nav.Link></Nav>}
      </Navbar.Collapse>
    </Navbar>

    <Router>
      <div>
        <Route exact path="/" render={() => <Posts posts={posts} upvote={upvote} downvote={downvote} searchWord={searchWord}></Posts>} />
        <Route exact path="/register" render={() => <Register></Register>} />
        <Route exact path="/login" render={() => <Login user={user} setUser={setUser}></Login>} />
        <Route exact path="/logout" render={() => <Redirect to='/' />} />
        <Route exact path="/post" render={() => <SubmitPost user={user}></SubmitPost>} />
        <Route exact path="/posts/:id" render={({ match }) => <SinglePost id={match.params.id} />} />
      </div>
    </Router>
  </>);
};
