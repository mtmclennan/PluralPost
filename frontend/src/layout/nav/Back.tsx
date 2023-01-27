import React from 'react';
import classes from './navItem/NavItem.module.scss';
import { ArrowCircleLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const Back = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <li className={classes.nav} onClick={onClickHandler}>
      <div>
        <ArrowCircleLeft size={20} color="#8626fa" weight="duotone" />
        Go Back
      </div>
    </li>
  );
};

export default Back;
