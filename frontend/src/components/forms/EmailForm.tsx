import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CMSForm.module.scss';
import SmallTextBox from '../inputs/SmallTextBox';
import useInput from '../../hooks/use-input';
import RichTextEditor from '../inputs/RichTextEditor';
import useModal from '../../hooks/use-modal';
import AuthContext from '../../store/auth-context';
import Modal from '../../UI/Modal';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { Email, EmailRes } from '../../types/interfaces';

const EmailForm = ({ id }: { id?: string }) => {
  const [richTextValue, setRichtextValue] = useState('');
  const [editorStore, setEditorStore] = useState<any>(null);
  const [email, setEmail] = useState<Email>();
  const { isLoading, error, sendRequest } = useHttp();
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const { modalMessage, showModal, setModalMessage, hideModal } =
    useModal(error);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/email/${AuthCtx.website.name}/emails`;

  const {
    value: subject,
    setValue: setSubject,
    isValid: subjectIsValid,
    hasError: subjectHasError,
    valueChangeHandler: subjectChangeHandler,
    inputBlurHandler: subjectBlurHandler,
    reset: resetSubject,
  } = useInput((value) => value.trim() !== '');

  useEffect(() => {
    if (!id) {
      return;
    }
    const applyEmail = ({ data }: any) => {
      setEmail(data);
    };

    sendRequest(
      {
        url: `${SERVER_URL}/${id}`,
        method: 'POST',
      },
      applyEmail
    );
  }, [sendRequest, id, SERVER_URL]);

  useEffect(() => {
    if (email) {
      if (editorStore) {
        editorStore.setData(email.message);
      }
      setSubject(email.subject);
    }
  }, [email]);

  const emailFormHandler = (event: React.FormEvent) => {
    const messageIsvalid = () => richTextValue.trim() !== '';
    const url = `${SERVER_URL}/${id}`;

    if (!subjectIsValid || !messageIsvalid) {
      subjectBlurHandler();

      setModalMessage('The can not be empty fields in email before sending');
      setTimeout(() => {
        hideModal();
      }, 3000);
      return;
    }

    if (AuthCtx.website.emailFromSite && !AuthCtx.website.email) {
      setModalMessage(
        'Can not send emails without an email address set for this site'
      );
      setTimeout(() => {
        hideModal();
      }, 3000);
      return;
    }

    const response = (res: EmailRes) => {
      if (res.status === 'success') {
        setModalMessage('Email Sent');
        setTimeout(() => {
          hideModal();
          navigate(`/subscribers`, { replace: true });
        }, 3000);
      } else {
        console.log(error);
        setModalMessage(error || 'Something went wrong!');
        setTimeout(() => {
          hideModal();
        }, 3000);
      }
    };

    sendRequest(
      {
        url,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          subject,
          message: richTextValue,
          status: 'SEND',
        },
      },
      response
    );
    resetSubject();
  };

  ///////////////////////////////////////////////////////////////////

  const onSaveHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `${SERVER_URL}/${id}` : SERVER_URL;

    const response = (res: EmailRes) => {
      if (res.status === 'success') {
        setModalMessage('Email Saved');
        setTimeout(() => {
          hideModal();
          if (!id) {
            navigate(`/edit-email/${res.data!._id}`, { replace: true });
          }
        }, 3000);
      } else {
        console.log(error);
        setModalMessage(error || 'Something went wrong!');
        setTimeout(() => {
          hideModal();
        }, 3000);
      }
    };
    sendRequest(
      {
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          subject,
          message: richTextValue,
        },
      },
      response
    );
  };

  const subjectInputClasses = subjectHasError
    ? `${classes.invalid} ${classes.input}`
    : classes.input;

  return (
    <Fragment>
      {showModal && (
        <Modal className={'modal'}>
          <div>{modalMessage}</div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      {/* <TopBar>
        <PostMenu />
      </TopBar> */}
      <div className="container">
        <form className={classes.form} onSubmit={emailFormHandler}>
          <h2>Email Subscribers</h2>
          <div className={classes.flex}>
            <p>
              <strong>To:</strong> All {AuthCtx.website.name} Subscribers
            </p>
            <p>
              <strong>Status: </strong>
              {email ? email.status : 'Draft'}
            </p>
          </div>

          <div className={classes.body}>
            <SmallTextBox
              fieldName="Subject"
              onChange={subjectChangeHandler}
              onBlur={subjectBlurHandler}
              value={subject}
              className={subjectInputClasses}
            />
            <div>
              <h3>Message</h3>
              <RichTextEditor
                setEditor={setEditorStore}
                website={AuthCtx.website.name}
                valueChangeHandler={setRichtextValue}
                id={id}
              />
            </div>
            {email?.status !== 'SENT' && (
              <div className={classes.btnContainer}>
                <button onClick={onSaveHandler}>Save</button>
                {id && <button>Send</button>}
              </div>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EmailForm;
