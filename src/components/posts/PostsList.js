import Card from '../../UI/Card';
import { useState, useEffect } from 'react';
import PostListItem from './PostListItem';
import useHttp from '../../hooks/use-http';
import classes from './PostsList.module.css';
import { useParams, useNavigate } from 'react-router-dom';

const PostsList = () => {
  const params = useParams();
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
    <Card>
      <div className={classes.titles}>
        <span>Title</span>
        <span>Date</span>
        <span>State</span>
        <span>ID</span>
      </div>
      <ul className={classes.postList}>
        {allPosts &&
          allPosts.data.map((post) => (
            <PostListItem
              onClick={onClickHandler}
              key={post._id}
              id={post._id}
              title={post.title}
              date={post.dateModified}
              published={post.published}
            />
          ))}
      </ul>
    </Card>
  );
};

export default PostsList;
