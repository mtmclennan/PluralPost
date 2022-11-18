import { Fragment, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import Modal from '../../UI/Modal';
import useInput from '../../hooks/use-input';
import useModal from '../../hooks/use-modal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { Res, Website } from '../../types/interfaces';

type NewWebsiteFormProps = {
  website?: Website;
  setShowForm?: () => void;
};

const NewWebsiteForm = ({ website, setShowForm }: NewWebsiteFormProps) => {
  const { isLoading, error, sendRequest } = useHttp();
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);

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

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const method = website ? 'PATCH' : 'POST';

    const response = (res: Res) => {
      if (res.status === 'success') {
        setModalMessage(`Website ${enteredWebsiteName} Added Successfuly`);
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

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div className="modal">
            <h3>{modalMessage}</h3>
          </div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="website-name">Website Name</label>
          <input
            id="website-name"
            type="text"
            onChange={websiteNameChangeHandler}
            onBlur={websiteNameBlurHandler}
            value={enteredWebsiteName}
          ></input>
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            id="url"
            type="text"
            onChange={websiteUrlChangeHandler}
            onBlur={websiteUrlBlurHandler}
            value={enteredWebsiteUrl}
          ></input>
        </div>
        <div>
          <label htmlFor="logo-url">Logo Url</label>
          <input
            id="logo-url"
            type="text"
            onChange={logoUrlChangeHandler}
            onBlur={logoUrlBlurHandler}
            value={enteredLogoUrl}
          ></input>
        </div>
        <div>
          <label htmlFor="category">Cateogory</label>
          <input
            id="category"
            type="text"
            onChange={categoryChangeHandler}
            onBlur={categoryBlurHandler}
            value={enteredCategory}
          ></input>
        </div>
        <button>Save</button>
      </form>
    </Fragment>
  );
};
export default NewWebsiteForm;
