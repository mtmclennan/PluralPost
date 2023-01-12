import React from 'react';
import UserPhoto from '../userPhoto/UserPhoto';
import classes from './UserPhotoSetting.module.scss';

interface UserPhotoSettingProps {
  name: string;
}

const UserPhotoSetting = ({ name }: UserPhotoSettingProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.photo}>
        <UserPhoto />
      </div>
      <div className={classes.name}>
        <h2>{name}</h2>
        <button className={classes.btn}>Change Photo</button>
      </div>
    </div>
  );
};

export default UserPhotoSetting;
