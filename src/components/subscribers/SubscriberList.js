import SubscriberItem from './SubsciberItem';
import Card from '../../UI/Card';

const SubscriberList = (props) => {
  const subscribers = props.subscribers.data;

  console.log(subscribers);
  return (
    <Card>
      {subscribers.map((subscriber) => (
        <SubscriberItem
          key={subscriber._id}
          id={subscriber._id}
          dateJoined={subscriber.createdAt}
          email={subscriber.email}
          name={subscriber.name}
          website={subscriber.websiteFrom}
        />
      ))}
    </Card>
  );
};

export default SubscriberList;
