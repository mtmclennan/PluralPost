import { Fragment, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import UsersList from '../components/users/UsersList';
import LoadingSpinner from '../UI/LoadingSpinner';
import SignupUserForm from '../components/forms/SignupUserForm';
import useModal from '../hooks/use-modal';
import Modal from '../UI/Modal';

const Users = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [users, setUsers] = useState();
  const [reload, setReload] = useState(false);
  const [showCreateUserMenu, setShowCreateUserMenu] = useState(false);
  const { showModal, modalMessage, hideModal } = useModal(error);
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users/`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data) => {
      setUsers(data);
    });
  }, [sendRequest, reload, SERVER_URL]);

  const createUserShowHandler = () => {
    setShowCreateUserMenu((current) => !current);
  };

  const hideModalHandler = () => {
    hideModal();
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <h3>{modalMessage}</h3>
        </Modal>
      )}
      <div className="containter-flex">
        <div className="heading">
          <h2 className="centered">Users</h2>
          <button onClick={createUserShowHandler}>
            {showCreateUserMenu ? 'Close' : 'Create New User'}
          </button>
        </div>
        {showCreateUserMenu && (
          <SignupUserForm
            setShowForm={setShowCreateUserMenu}
            setReload={setReload}
          />
        )}
        {isLoading && <LoadingSpinner />}
      </div>
      {users && <UsersList users={users} reload={setReload} />}
    </Fragment>
  );
};

export default Users;
