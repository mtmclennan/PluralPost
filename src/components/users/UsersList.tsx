import { SetStateBoolean } from '../../types/index.type';
import { UserData } from '../../types/interfaces';
import UsersItem from './UsersItem';

type UserListProps = {
  users: UserData;
  reload: SetStateBoolean;
};

const UserList = ({ users, reload }: UserListProps) => {
  const usersArr = users.data;

  return (
    <div className="container-flex">
      {usersArr.map((user) => (
        <UsersItem
          reload={reload}
          key={user._id}
          id={user._id}
          email={user.email}
          name={user.name}
          role={user.role}
        />
      ))}
    </div>
  );
};

export default UserList;
