import classes from './Card.module.css';

const Card = (props) => {
  const cardClasses = props.className ? props.className : classes.card;
  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
