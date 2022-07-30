const PostMenu = (props) => {
  return (
    <div className="side-bar__container">
      <div className="side-bar__messages">
        <h3>Post Status</h3>
        <p>{props.postStatus}</p>
      </div>
      <div className="side-bar__buttons">
        <button onClick={props.onPublish}>{props.publishBtnText}</button>
        <button onClick={props.onSave}>Save</button>
        <button onClick={props.onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default PostMenu;
