import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
        return <div style={{textAlign: 'center'}}>
            <img src={'http://localhost:3003/reddit_error.png'}  />
            <p style={{textAlign:"center"}}>
              <h1>Page not found!</h1>
              <Link to="/"> <span style={{color: 'deepskyblue'}}>{"<<"}</span> Return to All Posts </Link>
            </p>
          </div>;
}

export default PageNotFound;
