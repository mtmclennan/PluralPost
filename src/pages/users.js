import { Fragment, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import UsersList from '../components/users/UsersList';
import LoadingSpinner from '../UI/LoadingSpinner';
import SignupUserForm from '../components/forms/SignupUserForm';

const Users = () => {
  const { isLoading, sendRequest } = useHttp();
  const [users, setUsers] = useState();
  const [showCreateUserMenu, setShowCreateUserMenu] = useState(false);

  useEffect(() => {
    sendRequest({ url: 'http://localhost:3030/api/v1/users/' }, (data) => {
      setUsers(data);
    });
  }, [sendRequest]);

  const createUserShowHandler = () => {
    setShowCreateUserMenu((current) => !current);
  };

  return (
    <Fragment>
      <div className="heading">
        <h2 className="centered">Users</h2>
        <button onClick={createUserShowHandler}>Create New User</button>
        {showCreateUserMenu && <SignupUserForm />}
        {isLoading && <LoadingSpinner />}
      </div>
      {users && <UsersList users={users} />}
    </Fragment>
  );
};

export default Users;
