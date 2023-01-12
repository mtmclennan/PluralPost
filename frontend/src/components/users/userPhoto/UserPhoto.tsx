import React from 'react';
import defaultUserPhoto from '../../../assets/users/photos/default.png';
import classes from './UserPhoto.module.scss';

const UserPhoto = ({ photo }: { photo?: string }) => {
  return (
    <div className={classes.imageContainer}>
      <img src={photo ? photo : defaultUserPhoto} alt="User" />
    </div>
  );
};

export default UserPhoto;
