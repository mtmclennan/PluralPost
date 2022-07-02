import classes from './SubscriberItem.module.css';

const SubsciberItem = (props) => {
  return (
    <li className={classes.item}>
      <p>{props.name}</p>
      <p>{props.email}</p>
      <p>{props.website}</p>
      <p>{props.dateJoined}</p>
    </li>
  );
};
export default SubsciberItem;
