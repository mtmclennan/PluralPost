import SubscriberItem from './SubsciberItem';
import Card from '../../UI/Card';

const SubscriberList = (props) => {
  const subscribers = props.subscribers.data;

  console.log(subscribers);
  return (
    <div className="container-flex">
      <div className="title-bar">
        <p>Name</p>
        <p>Email</p>
        <p>Website</p>
        <p>Date Joined</p>
      </div>
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
    </div>
  );
};

export default SubscriberList;
