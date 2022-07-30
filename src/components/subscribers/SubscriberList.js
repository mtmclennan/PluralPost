import SubscriberItem from './SubsciberItem';

const SubscriberList = (props) => {
  const subscribers = props.subscribers.data;

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
          reload={props.reload}
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
