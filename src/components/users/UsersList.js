import UsersItem from './UsersItem';

const UserList = (props) => {
  const users = props.users.data;

  return (
    <div className="container-flex">
      {users.map((user) => (
        <UsersItem
          reload={props.reload}
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
