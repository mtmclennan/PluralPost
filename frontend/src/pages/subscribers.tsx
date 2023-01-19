import { Fragment, useState, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Link } from 'react-router-dom';
import SubscriberPreview from '../components/subscribers/SubscriberPreview';
import EmailPreview from '../components/subscribers/EmailPreview';

const Subscribers = () => {
  const [subTotal, setSubTotal] = useState<number>();
  const [emailTotal, setEmailTotal] = useState<number>(0);

  const AuthCtx = useContext(AuthContext);

  const subTotalHandler = (total: number) => {
    setSubTotal(total);
  };

  const emailTotalHandler = (total: number) => {
    setEmailTotal(total);
  };

  return (
    <Fragment>
      <div className="container-email">
        <div>
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

        <div>
          <div className="heading">
            <h1>Emails</h1>
          </div>
          <div className="preview-email__card">
            <div className="preview-post__heading">
              <p>Recent Emails</p>
              <Link to="/email">
                <button>New Email</button>
              </Link>
              <div className="centered">
                <p className="preview__total">Total:</p>
                {emailTotal && <p>{emailTotal}</p>}
              </div>
            </div>
            {AuthCtx.website.name && (
              <EmailPreview
                website={AuthCtx.website.name}
                total={emailTotalHandler}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Subscribers;
