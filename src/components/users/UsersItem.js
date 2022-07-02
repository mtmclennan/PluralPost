import { Fragment, useState } from 'react';
import useHttp from '../../hooks/use-http';
import SlideDownMenu from '../../UI/SlideDownMenu';
import classes from './UsersItem.module.css';

const UsersItem = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { sendRequest } = useHttp();
  const showMenuHandler = (e) => {
    setShowMenu((current) => !current);
  };

  const mouseOutHandler = () => {
    return;
  };

  const deleteUserHandler = (e) => {
    const id = e.target.id;
    console.log(id);

    const responce = (res) => {
      console.log(res.status);
    };

    sendRequest(
      {
        url: `http://localhost:3030/api/v1/users/${id}`,
        method: 'DELETE',
      },
      responce
    );
  };

  return (
    <Fragment>
      <li
        className={classes.item}
        onClick={showMenuHandler}
        onMouseLeave={mouseOutHandler}
      >
        <p>{props.name}</p>
        <p>{props.email}</p>
        <p>{props.role}</p>
      </li>
      {showMenu && (
        <SlideDownMenu
          id={props.id}
          buttonLabel1={'delete'}
          onClick1={deleteUserHandler}
        />
      )}
    </Fragment>
  );
};
export default UsersItem;
