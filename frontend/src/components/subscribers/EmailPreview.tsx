import { Fragment, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { Link } from 'react-router-dom';
import { Email } from '../../types/interfaces';
import LoadingSpinner from '../../UI/LoadingSpinner';

type EmailPreviewProps = {
  total: (x: number) => void;
  website: string;
};

const EmailPreview = ({ total, website }: EmailPreviewProps) => {
  const { isLoading, sendRequest } = useHttp();
  const [emails, setEmails] = useState<Email[]>();

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/email/${website}/emails`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, ({ data }) => {
      setEmails(data);
    });
  }, [sendRequest, SERVER_URL]);

  useEffect(() => {
    if (emails) {
      total(emails.length);
    }
  }, [emails, total]);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {emails &&
        emails.slice(0, 20).map((email) => (
          <li key={email._id} className="preview-email">
            <div>
              <strong>
                <p>Subject</p>
              </strong>
              <p>{email.subject}</p>
            </div>
            <div>
              <strong>
                <p>Author</p>
              </strong>
              <p>{email.author.name}</p>
            </div>
            <div>
              <strong>
                <p>status</p>
              </strong>
              <p>{email.status}</p>
            </div>

            <div>
              <strong>
                <p>Date Modified</p>
              </strong>
              <p>{email.dateModified.split('T')[0]}</p>
            </div>
            <Link
              className="preview-post__edit"
              to={`/edit-email/${email._id}`}
            >
              Edit
            </Link>
          </li>
        ))}
    </Fragment>
  );
};

export default EmailPreview;
