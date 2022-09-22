const WebsiteListItem = (props) => {
  return (
    <li className="website-list__row" onClick={props.onClick} id={props.id}>
      <img className="logo" src={props.logo} alt="logo" />
      <p>{props.website}</p>
      <p>{props.category}</p>
      <p>{props.url}</p>
    </li>
  );
};

export default WebsiteListItem;
