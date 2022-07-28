import Card from '../../UI/Card';
import { useState, useEffect, Fragment } from 'react';
import PostListItem from './PostListItem';
import useHttp from '../../hooks/use-http';
import classes from './PostsList.module.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../UI/LoadingSpinner';

const PostsList = () => {
  const navigate = useNavigate();
  const { isLoading, sendRequest } = useHttp();
  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    sendRequest(
      { url: 'http://localhost:3030/api/v1/content/posts' },
      (data) => {
        setAllPosts(data);
      }
    );
  }, [sendRequest]);

  const onClickHandler = (e) => {
    navigate(`/edit-post/${e.currentTarget.id}`);
    // params.postId = e.currentTarget.id;
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <div className={classes.postList}>
        <div className={classes.titles}>
          <span>Title</span>
          <span>Date</span>
          <span>Author</span>
          <span>State</span>
          <span>Tags</span>
        </div>
        <ul>
          {allPosts &&
            allPosts.data.map((post) => (
              <PostListItem
                onClick={onClickHandler}
                key={post._id}
                id={post._id}
                title={post.title}
                date={post.dateModified}
                author={post.author}
                published={post.published}
                tags={post.tags}
              />
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default PostsList;
