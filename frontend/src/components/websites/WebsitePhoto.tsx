import React from 'react';
import classes from './WebsitePhoto.module.scss';

const WebsitePhoto = ({ photo, name }: { photo: string; name: string }) => {
  return (
    <div className={classes.imageContainer}>
      <img src={photo} alt="logo" key={photo} />
      <h1>{name.toUpperCase()}</h1>
    </div>
  );
};

export default WebsitePhoto;
