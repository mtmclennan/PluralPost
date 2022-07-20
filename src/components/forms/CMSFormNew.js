import { Fragment, useState } from 'react';
import ImageInput from '../../components/CMSInputs/ImageInput';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInput from '../../hooks/use-input';
import RichTextEditor from '../CMSInputs/RichTextEditor';
import Modal from '../../UI/Modal';

const CMSForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [responceMessage, setResponceMessage] = useState();
  const { isLoading, error, sendRequest } = useHttp();
  const [editorStore, setEditorStore] = useState();

  const [richTextValue, setRichtextValue] = useState();

  const editorStoreHandler = (editor) => {
    setEditorStore(editor);
  };

  const valueChangeHandler = (data) => {
    setRichtextValue(data);
  };

  const cmsFormSumbitHandler = (e) => {
    e.preventDefault();

    if (
      !enteredTitleIsValid ||
      !enteredAuthorIsValid ||
      !enteredDateIsValid ||
      !enteredDescriptionIsValid ||
      !enteredSlugIsValid ||
      !enteredPhotoCaptionIsValid ||
      !enteredTagsIsValid
    ) {
      return;
    }

    const response = (res) => {
      setShowModal(true);
      if (res.status === 'success') setResponceMessage('Post Published!');
      else {
        setResponceMessage('Something went wrong!');
      }
    };
    sendRequest(
      {
        url: 'http://localhost:3030/api/v1/content/posts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          title: enteredTitle,
          photoCaption: enteredPhotoCaption,
          slug: enteredSlug,
          tags: enteredTags,
          author: enteredAuthor,
          date: enteredDate,
          description: enteredDescription,
          postBody: richTextValue,
        },
      },
      response
    );

    resetAuthorInput();
    resetDateInput();
    resetDescriptionInput();
    resetPhotoCaptionInput();
    resetTagsInput();
    resetTitleInput();
    resetslugInput();
    editorStore.setData('');
  };

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPhotoCaption,
    isValid: enteredPhotoCaptionIsValid,
    hasError: photoCaptionInputHasError,
    valueChangeHandler: photoCaptionChangeHandler,
    inputBlurHandler: photoCaptionBlurHandler,
    reset: resetPhotoCaptionInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredSlug,
    isValid: enteredSlugIsValid,
    hasError: slugInputHasError,
    valueChangeHandler: slugChangeHandler,
    inputBlurHandler: slugBlurHandler,
    reset: resetslugInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredTags,
    isValid: enteredTagsIsValid,
    hasError: tagsInputHasError,
    valueChangeHandler: tagsChangeHandler,
    inputBlurHandler: tagsBlurHandler,
    reset: resetTagsInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredAuthor,
    isValid: enteredAuthorIsValid,
    hasError: authorInputHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthorInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== '');

  const titleInputClasses = titleInputHasError
    ? 'form__input invalid'
    : 'form__input';

  const photoCaptionInputClasses = photoCaptionInputHasError
    ? 'form__input invalid'
    : 'form__input';

  const slugInputClasses = slugInputHasError
    ? 'form__input invalid'
    : 'form__input';
  const tagsInputClasses = tagsInputHasError
    ? 'form__input invalid'
    : 'form__input';
  const authorInputClasses = authorInputHasError
    ? 'form__input invalid'
    : 'form__input';
  const dateInputClasses = dateInputHasError
    ? 'form__input invalid'
    : 'form__input';
  const descriptionInputClasses = descriptionInputHasError
    ? 'form__input invalid'
    : 'form__input';

  const showModalHandler = () => {
    setShowModal(false);
  };

  const responseHandler = (data) => {
    setUploadedFile(data);
    console.log(data);
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div>
            <h1>{responceMessage}</h1>
          </div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      <form onSubmit={cmsFormSumbitHandler}>
        <h2>Add New Post</h2>
        <div className="form__grid">
          <div className="wide">
            <label className="form__label" htmlFor="title">
              Title
            </label>
            <input
              className={titleInputClasses}
              type="text"
              id="title"
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              value={enteredTitle}
            ></input>
          </div>
          <ImageInput response={responseHandler} />
          {uploadedFile && (
            <div>
              <img alt="some here" src={uploadedFile.url} />
            </div>
          )}
          <div>
            <label className="form__label" htmlFor="photo-caption">
              Photo Caption
            </label>
            <input
              className={photoCaptionInputClasses}
              type="text"
              id="photo-caption"
              onChange={photoCaptionChangeHandler}
              onBlur={photoCaptionBlurHandler}
              value={enteredPhotoCaption}
            ></input>
          </div>
          <div>
            <label className="form__label" htmlFor="slug">
              Slug
            </label>
            <input
              className={slugInputClasses}
              type="text"
              id="slug"
              onChange={slugChangeHandler}
              onBlur={slugBlurHandler}
              value={enteredSlug}
            ></input>
          </div>
          <div>
            <label className="form__label" htmlFor="tags">
              Tags
            </label>
            <input
              className={tagsInputClasses}
              type="text"
              id="tags"
              onChange={tagsChangeHandler}
              onBlur={tagsBlurHandler}
              value={enteredTags}
            ></input>
          </div>
          <div>
            <label className="form__label" htmlFor="author">
              Author
            </label>
            <input
              className={authorInputClasses}
              type="text"
              id="author"
              onChange={authorChangeHandler}
              onBlur={authorBlurHandler}
              value={enteredAuthor}
            ></input>
          </div>
          <div>
            <label className="form__label" htmlFor="date">
              Date
            </label>
            <input
              className={dateInputClasses}
              type="date"
              id="date"
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              value={enteredDate}
            ></input>
          </div>
        </div>
        <div>
          <label className="form__label" htmlFor="description">
            Meta Description
          </label>
          <textarea
            className={descriptionInputClasses}
            id="description"
            spellCheck="true"
            autoCorrect="on"
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            value={enteredDescription}
            rows="5"
            cols="80"
          ></textarea>
        </div>

        <RichTextEditor
          valueChangeHandler={valueChangeHandler}
          editor={editorStoreHandler}
        />
        <button>Save</button>
      </form>
    </Fragment>
  );
};
export default CMSForm;
