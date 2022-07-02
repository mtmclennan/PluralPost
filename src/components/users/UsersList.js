import Card from '../../UI/Card';
import UsersItem from './UsersItem';
import { useState } from 'react';

const UserList = (props) => {
  const users = props.users.data;

  return (
    <Card>
      {users.map((user) => (
        <UsersItem
          key={user._id}
          id={user._id}
          email={user.email}
          name={user.name}
          role={user.role}
        />
      ))}
    </Card>
  );
};

export default UserList;
