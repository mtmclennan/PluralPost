import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PostsList from '../components/posts/PostsList';

const Posts = () => {
  return (
    <Fragment>
      <div className="heading">
        <h2>Posts</h2>
        <Link className="btn" to="/new-post">
          Add New Post
        </Link>
      </div>
      <PostsList />
    </Fragment>
  );
};
export default Posts;
