import React from 'react';
import classes from './UserPhoto.module.scss';

const UserPhoto = ({ photo }: { photo: string }) => {
  return (
    <div className={classes.imageContainer}>
      <img src={photo} alt="User" key={photo} />
    </div>
  );
};

export default UserPhoto;
