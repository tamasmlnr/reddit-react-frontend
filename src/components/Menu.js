import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import SubmitPost from './SubmitPost';
import Register from './Register';
import Login from './Login';
import Messages from './Messages';
import PageNotFound from './PageNotFound.js';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { Posts, SinglePost, PostsByUser, PostsSavedByUser } from "./Posts";
export const Menu = ({ posts, upvote, downvote, savePost, user, setUser, logOut }) => {

  const [searchWord, setSearchWord] = useState('');

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
          {user && <Nav.Link href={`/user/${user.username}`}>my posts</Nav.Link>}
          {user && <Nav.Link href={`/saved/`}>my saved posts</Nav.Link>}
          {user && <Nav.Link href={`/messages/`}>messages</Nav.Link>}
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
      <Switch>
        <Route exact path="/" render={() => <Posts posts={posts} upvote={upvote}
          downvote={downvote} savePost={savePost} searchWord={searchWord} user={user}></Posts>} />
        <Route exact path="/register" render={() => <Register></Register>} />
        <Route exact path="/login" component={<Login user={user} setUser={setUser}></Login>} />
        <Route exact path="/logout" render={() => <Redirect to='/' />} />
        <Route exact path="/post" render={() => <SubmitPost user={user}></SubmitPost>} />
        <Route exact path="/user/:username" render={({ match }) => <PostsByUser posts={posts}
          upvote={upvote} downvote={downvote} savePost={savePost} searchWord={searchWord}
          username={match.params.username} user={user}></PostsByUser>} />
        <Route exact path="/saved/" render={({ match }) => <PostsSavedByUser posts={posts}
          upvote={upvote} downvote={downvote} savePost={savePost} searchWord={searchWord}
          user={user}></PostsSavedByUser>} />
        <Route exact path="/messages/" render={({ match }) => <Messages userTo={user}
          user={user}></Messages>} />
        <Route exact path="/posts/:id" render={({ match }) => <SinglePost id={match.params.id} />} />
        <Route exact path="/" component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </>);
};
