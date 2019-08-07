import React, { useState, useEffect } from 'react';
import './App.css';
import postService from './services/PostService'
import Table from 'react-bootstrap/Table';
import SubmitBlog from './components/SubmitPost'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'


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
      <div> <Posts posts={posts}></Posts> </div>
      <SubmitBlog></SubmitBlog>
    </>
  );
}

export default App;
