import React, { useContext, useEffect, useTransition } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './form.module.scss';
import Modal from '../../UI/Modal';
import useInput from '../../hooks/use-input';
import useModal from '../../hooks/use-modal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { Res, Website, WebsiteRes } from '../../types/interfaces';
import SmallTextBox from '../inputs/SmallTextBox';
import AuthContext from '../../store/auth-context';

type NewWebsiteFormProps = {
  website?: Website;
  setShowForm: () => void;
};

const NewWebsiteForm = ({ website, setShowForm }: NewWebsiteFormProps) => {
  const { isLoading, error, sendRequest } = useHttp();
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);
  const AuthCtx = useContext(AuthContext);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/websites/${
    website ? website._id : ''
  }`;

  const {
    value: enteredWebsiteName,
    setValue: setEnteredWebsiteName,
    isValid: enteredwebsiteNameIsValid,
    hasError: websiteNameInputHasError,
    valueChangeHandler: websiteNameChangeHandler,
    inputBlurHandler: websiteNameBlurHandler,
    reset: resetWebsiteNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredWebsiteUrl,
    setValue: setEnteredWebsiteUrl,
    isValid: enteredwebsiteUrlIsValid,
    hasError: websiteUrlInputHasError,
    valueChangeHandler: websiteUrlChangeHandler,
    inputBlurHandler: websiteUrlBlurHandler,
    reset: resetWebsiteUrlInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLogoUrl,
    setValue: setEnteredLogoUrl,
    isValid: enteredLogoUrlIsValid,
    hasError: logoUrlInputHasError,
    valueChangeHandler: logoUrlChangeHandler,
    inputBlurHandler: logoUrlBlurHandler,
    reset: resetLogoUrlInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCategory,
    setValue: setEnteredCategory,
    isValid: categoryIsValid,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,
  } = useInput((value) => value.trim() !== '');

  useEffect(() => {
    if (website) {
      setEnteredWebsiteName(website.name);
      setEnteredWebsiteUrl(website.url);
      setEnteredCategory(website.category);
      setEnteredLogoUrl(website.logo);
    }
  }, [website]);

  const showModalHandler = () => {
    hideModal();
  };

  const closeFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setShowForm();
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const method = website ? 'PATCH' : 'POST';

    const response = (res: WebsiteRes) => {
      if (res.status === 'success') {
        setModalMessage(`Website ${enteredWebsiteName} Added Successfuly`);
        AuthCtx.onWebsiteSelect(res.data);
        // props.reload((currentState) => !currentState);
        setTimeout(() => {
          hideModal();
          resetWebsiteNameInput();
          resetWebsiteUrlInput();
          resetCategoryInput();
          resetLogoUrlInput();
          if (setShowForm) {
            setShowForm();
          }
        }, 2000);
      } else {
        setTimeout(() => {
          hideModal();
        }, 3000);

        setModalMessage(error || 'Something went wrong!');
      }
    };

    sendRequest(
      {
        url: SERVER_URL,
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name: enteredWebsiteName,
          url: enteredWebsiteUrl,
          category: enteredCategory,
          logo: enteredLogoUrl,
        },
      },
      response
    );
  };

  const nameInputClasses = websiteNameInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const urlInputClasses = websiteUrlInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const logoInputClasses = logoUrlInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const categoryInputClasses = categoryInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  return (
    <div className={classes.container}>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
          </div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      <form onSubmit={formSubmitHandler}>
        <SmallTextBox
          className={nameInputClasses}
          fieldName="Website Name"
          onChange={websiteNameChangeHandler}
          onBlur={websiteNameBlurHandler}
          value={enteredWebsiteName}
        />
        <SmallTextBox
          className={logoInputClasses}
          fieldName="Website Logo"
          onChange={logoUrlChangeHandler}
          onBlur={logoUrlBlurHandler}
          value={enteredLogoUrl}
        />
        <SmallTextBox
          className={urlInputClasses}
          fieldName="Website Url"
          onChange={websiteUrlChangeHandler}
          onBlur={websiteUrlBlurHandler}
          value={enteredWebsiteUrl}
        />

        <SmallTextBox
          className={categoryInputClasses}
          fieldName="Category"
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          value={enteredCategory}
        />
        <div className={classes.btnContainer}>
          <button>Save</button>
          <button onClick={closeFormHandler}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default NewWebsiteForm;
