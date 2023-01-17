import { Fragment } from 'react';
import classes from './PostMenu.module.scss';

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
    <div className={classes.container}>
      <div className={classes.flex}>
        <h3>Post Status</h3>
        <p>{postStatus}</p>
      </div>
      <div className={classes.flex}>
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
