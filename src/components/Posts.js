import React, { useState, useEffect } from 'react';
import postService from '../services/PostService';
import { Card } from 'react-bootstrap';
import Comments from './Comments';
import SubmitComment from './SubmitComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';

export const Posts = ({ posts, upvote, downvote, savePost, searchWord, user }) => {
  let filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchWord.toLowerCase()));
  return (filteredPosts.length === 0 ? <div className="text-center" style={{ padding: '4em' }}>No results found! </div> :
    <div className="container" style={{ paddingTop: '4em' }}>
      {filteredPosts.map(p => <Post post={p} key={p._id} upvote={upvote} downvote={downvote}
      savePost = {savePost} user={user}></Post>)}
    </div>);
};

export const PostsByUser = ({ posts, upvote, downvote, savePost, searchWord, username, user }) => {
  let filteredPosts = posts.filter(post => post.user.username === username &&
    post.title.toLowerCase().includes(searchWord.toLowerCase()));
  return (filteredPosts.length === 0 ? <div className="text-center" style={{ padding: '4em' }}>No results found! </div> :
    <div className="container" style={{ paddingTop: '4em' }}>
      {filteredPosts.map(p => <Post post={p} key={p._id} upvote={upvote} downvote={downvote} 
      savePost = {savePost} user={user}></Post>)}
    </div>);
};

export const PostsSavedByUser = ({ posts, upvote, downvote, savePost, searchWord, user }) => {
  let filteredPosts = posts.filter(post => post.savedBy.includes(user.id) &&
    post.title.toLowerCase().includes(searchWord.toLowerCase()));
  return (filteredPosts.length === 0 ? <div className="text-center" style={{ padding: '4em' }}>No results found! </div> :
    <div className="container" style={{ paddingTop: '4em' }}>
      {filteredPosts.map(p => <Post post={p} key={p._id} upvote={upvote} downvote={downvote} 
      savePost = {savePost} user={user}></Post>)}
    </div>);
};

const Post = ({ post, upvote, downvote, savePost, user }) => {
  return (<div className="post">
    {user && <aside className="left-sidebar">
      <FontAwesomeIcon icon={faArrowUp} onClick={() => upvote(post, post._id)} size="xs"
        color={user && post.upvotes.includes(user.id) ? "deepskyblue" : "grey"} /><br />
      {post.score}<br />
      <FontAwesomeIcon icon={faArrowDown} onClick={() => downvote(post, post._id)} size="xs"
        color={user && post.downvotes.includes(user.id) ? "deepskyblue" : "grey"} /><br />
    </aside>}
    <div className="centered"><Link to={`/posts/${post._id}`}><h6>{post.title}</h6></Link>
      <div className="small">by <Link to={`/user/${post.user.username}`}>{post.author}</Link> on {post.date.substring(0, 10)}</div></div>
    {post.comments.length} comments &nbsp;
    <FontAwesomeIcon icon={faBookmark} onClick={() => savePost(post, post._id)} size="xs"
        color={user && post.savedBy.includes(user.id) ? "deepskyblue" : "grey"} /><br />
  </div>);
};
export const SinglePost = ({ id }) => {
  const [singlePost, setSinglePost] = useState([]);
  useEffect(() => {
    postService.getPost(id).then(response => setSinglePost(response));
  }, []);
  return (<div className="container">
    <Card bg="dark" text="white" style={{ margin: '4em' }}>
      <Card.Header>    <div class="col-md-2 float-right">
        <DeletePost id={singlePost._id}></DeletePost>
      </div><Card.Title>{singlePost.title}</Card.Title>          by {singlePost.author}</Card.Header>
      <Card.Body>
        {singlePost.content}
      </Card.Body>
    </Card>
    <SubmitComment post={singlePost}></SubmitComment>
    {singlePost._id && <Comments postId={singlePost._id}></Comments>}
  </div>);
};
