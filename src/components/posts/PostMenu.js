import { Fragment } from 'react';

const PostMenu = (props) => {
  return (
    <Fragment>
      <div>
        <h3>Post Status</h3>
        <p>{props.postStatus}</p>
      </div>
      {/* <div>
        <button onClick={props.onClickPublish}>Publish</button>
        <button onClick={props.onClickSave}>Save</button>
        <button onClick={props.onClickDelete}>Delete</button>
      </div> */}
    </Fragment>
  );
};

export default PostMenu;
