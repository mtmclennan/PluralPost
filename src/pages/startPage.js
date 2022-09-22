import AuthContext from '../store/auth-context';
import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostPreview from '../components/posts/PostPreview';

import Card from '../UI/Card';

import SubscriberPreview from '../components/subscribers/SubscriberPreview';

const StartPage = () => {
  const AuthCtx = useContext(AuthContext);
  const [postTotal, setPostTotal] = useState();
  const [subTotal, setSubTotal] = useState();
  const navigate = useNavigate();

  const onClickSubHandler = () => {
    navigate('/subscribers');
  };

  const onClickPostHandler = () => {
    navigate('/posts');
  };

  const addNewPostHandler = () => {
    navigate('/new-post');
  };

  const onClickSettingsHandler = () => {
    navigate('/siteSettings');
  };

  const postTotalHandler = (total) => {
    setPostTotal(total);
  };
  const subTotalHandler = (total) => {
    setSubTotal(total);
  };

  return (
    <Fragment>
      <div className="title" onClick={onClickSettingsHandler}>
        {AuthCtx.website.logo && (
          <img className="logo" src={`${AuthCtx.website.logo}`} alt="logo" />
        )}
        <h2>{AuthCtx.website.name}</h2>
      </div>
      <div className="start-container">
        <Card className="">
          <div className="preview-post__heading">
            <p>Latest Posts</p>
            <div className="centered">
              <button onClick={onClickPostHandler}>All Posts</button>
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

        <div className="preview-sub__card" onClick={onClickSubHandler}>
          <div className="preview-post__heading">
            <p>Recent</p>
            <button onClick={onClickSubHandler}>Subscibers</button>
            <div className="centered">
              <p className="preview__total">Total:</p>
              {subTotal && (
                <p className="preview__total">{subTotal.toString()}</p>
              )}
            </div>
          </div>
          {AuthCtx.website.name && (
            <SubscriberPreview
              total={subTotalHandler}
              website={AuthCtx.website.name}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default StartPage;
