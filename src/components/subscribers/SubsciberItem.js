const SubsciberItem = (props) => {
  return (
    <li className="sub-item">
      <p>{props.name}</p>
      <p>{props.email}</p>
      <p>{props.website}</p>
      <p>{props.dateJoined}</p>
    </li>
  );
};
export default SubsciberItem;
