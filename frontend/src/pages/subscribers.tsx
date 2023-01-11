import { Fragment, useState, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Link } from 'react-router-dom';
import SubscriberPreview from '../components/subscribers/SubscriberPreview';

const Subscribers = () => {
  const [subTotal, setSubTotal] = useState<number>();

  const AuthCtx = useContext(AuthContext);

  const subTotalHandler = (total: number) => {
    setSubTotal(total);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="heading">
          <h1>Subscribers</h1>
          {AuthCtx.user.role === 'admin' && (
            <Link to="/manageSubs" className="btn">
              Create New Subscriber
            </Link>
          )}
        </div>

        <div className="preview-sub__card">
          <div className="preview-post__heading">
            <p>Recent</p>
            <div className="centered">
              <p className="preview__total">Total:</p>
              {subTotal && (
                <p className="preview__total">{subTotal.toString()}</p>
              )}
            </div>
          </div>
          {AuthCtx.website.name && (
            <SubscriberPreview
              total={subTotalHandler}
              website={AuthCtx.website.name}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Subscribers;
