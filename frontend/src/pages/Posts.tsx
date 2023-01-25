import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import PostPreview from '../components/posts/PostPreview';
import AuthContext from '../store/auth-context';

const Posts = () => {
  const AuthCtx = useContext(AuthContext);
  const [postTotal, setPostTotal] = useState<number>();
  const navigate = useNavigate();

  const postTotalHandler = (total: number) => {
    setPostTotal(total);
  };

  const addNewPostHandler = () => {
    navigate('/new-post');
  };

  return (
    <Fragment>
      <div className="title">
        {AuthCtx.website.logo && (
          <img className="logo" src={`${AuthCtx.website.logo}`} alt="logo" />
        )}
        <h2>{AuthCtx.website.name}</h2>
      </div>
      <div className="container">
        <div className="heading">
          <h3>Posts</h3>
        </div>
        <Card className="">
          <div className="preview-post__heading">
            <div className="centered">
              <button onClick={addNewPostHandler}>Add New Post</button>
            </div>
            <div className="centered">
              <p className="preview__total">Total Posts:</p>
              {postTotal && (
                <p className="preview__total">{postTotal.toString()}</p>
              )}
            </div>
          </div>
          {AuthCtx.website.name && (
            <PostPreview
              total={postTotalHandler}
              website={AuthCtx.website.name}
            />
          )}
        </Card>
      </div>
    </Fragment>
  );
};
export default Posts;
