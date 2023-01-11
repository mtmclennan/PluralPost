import { Fragment } from 'react';

type PostMenuProps = {
  onSave: (event: React.UIEvent<HTMLButtonElement>) => void;
  postStatus: string;
  id: string;
  onPublish: () => void;
  onDelete: () => void;
  publishBtnText: string;
};

const PostMenu = ({
  onSave,
  postStatus,
  id,
  onPublish,
  onDelete,
  publishBtnText,
}: PostMenuProps) => {
  return (
    <div className="side-bar__container">
      <div className="side-bar__messages">
        <h3>Post Status</h3>
        <p>{postStatus}</p>
      </div>
      <div className="side-bar__buttons">
        <button onClick={onSave}>Save</button>
        {id && (
          <Fragment>
            <button onClick={onPublish}>{publishBtnText}</button>
            <button onClick={onDelete}>Delete</button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PostMenu;
