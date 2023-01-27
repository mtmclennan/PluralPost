import classes from './Card.module.scss';

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card = ({ className, children }: CardProps) => {
  const cardClasses = className ? className : classes.card;
  return <div className={cardClasses}>{children}</div>;
};

export default Card;
