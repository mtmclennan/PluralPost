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

  console.log(users);

  const createUserShowHandler = () => {
    setShowCreateUserMenu((current) => !current);
  };

  return (
    <Fragment>
      <button onClick={createUserShowHandler}>Create New User</button>
      {showCreateUserMenu && <SignupUserForm />}
      <h1 className="centered">Users</h1>
      {isLoading && <LoadingSpinner />}
      {users && <UsersList users={users} />}
    </Fragment>
  );
};

export default Users;
