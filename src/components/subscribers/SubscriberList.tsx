// import SubscriberItem from './SubsciberItem';
// import useHttp from '../../hooks/use-http';
// import { Fragment, useEffect, useState } from 'react';
// import LoadingSpinner from '../../UI/LoadingSpinner';

// const SubscriberList = (props) => {
//   const { isLoading, sendRequest } = useHttp();
//   const [subscribers, setSubscribers] = useState();

//   const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/subscribers/${props.website}/subscribers`;

//   useEffect(() => {
//     sendRequest({ url: SERVER_URL }, (data) => {
//       setSubscribers(data);
//     });
//   }, [sendRequest, SERVER_URL]);

//   return (
//     <Fragment>
//       {isLoading && <LoadingSpinner />}
//       <div className="container-flex">
//         <div className="title-bar">
//           <p>Name</p>
//           <p>Email</p>
//           <p>Website</p>
//           <p>Date Joined</p>
//         </div>

//         {subscribers &&
//           subscribers.data.map((subscriber) => (
//             <SubscriberItem
//               reload={props.reload}
//               key={subscriber._id}
//               id={subscriber._id}
//               dateJoined={subscriber.createdAt}
//               email={subscriber.email}
//               name={subscriber.name}
//               website={props.website}
//             />
//           ))}
//       </div>
//     </Fragment>
//   );
// };

// export default SubscriberList;
