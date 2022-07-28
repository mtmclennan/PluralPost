import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CMSForm.module.css';
import ImageInput from '../CMSInputs/ImageInput';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInput from '../../hooks/use-input';
import PostMenu from '../../components/posts/PostMenu';
import RightSideBar from '../../layout/RightSideBar';
import RichTextEditor from '../CMSInputs/RichTextEditor';
import Modal from '../../UI/Modal';

const CMSForm = (props) => {
  let navigate = useNavigate();
  const [postId, setPostId] = useState();
  const [post, setPost] = useState();
  const [published, setPublished] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [responceMessage, setResponceMessage] = useState();
  const { isLoading, error, sendRequest } = useHttp();
  const [editorStore, setEditorStore] = useState();
  const [richTextValue, setRichtextValue] = useState();

  if (props.id && !postId) {
    setPostId(props.id);
  }

  const {
    value: enteredTitle,
    setValue: setEnteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPhotoCaption,
    setValue: setEnteredPhotoCaption,
    isValid: enteredPhotoCaptionIsValid,
    hasError: photoCaptionInputHasError,
    valueChangeHandler: photoCaptionChangeHandler,
    inputBlurHandler: photoCaptionBlurHandler,
    reset: resetPhotoCaptionInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredSlug,
    setValue: setEnteredSlug,
    isValid: enteredSlugIsValid,
    hasError: slugInputHasError,
    valueChangeHandler: slugChangeHandler,
    inputBlurHandler: slugBlurHandler,
    reset: resetslugInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredTags,
    setValue: setEnteredTags,
    isValid: enteredTagsIsValid,
    hasError: tagsInputHasError,
    valueChangeHandler: tagsChangeHandler,
    inputBlurHandler: tagsBlurHandler,
    reset: resetTagsInput,
  } = useInput((value) => value !== '');

  const {
    value: enteredAuthor,
    setValue: setEnteredAuthor,
    isValid: enteredAuthorIsValid,
    hasError: authorInputHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthorInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDate,
    setValue: setEnteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDescription,
    setValue: setEnteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== '');

  const editorStoreHandler = (editor) => {
    setEditorStore(editor);
  };

  const valueChangeHandler = (data) => {
    setRichtextValue(data);
  };

  const cmsFormSumbitHandler = (e) => {
    e.preventDefault();
    console.log(postId);
    const httpMethod = postId ? 'PATCH' : 'POST';
    const id = postId ? `/${postId}` : '';

    const response = (res) => {
      setShowModal(true);
      if (res.status === 'success') {
        setResponceMessage('Post Saved');
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
        if (!postId) {
          setPostId(res.data._id);
          setPublished('draft');
        }
      } else {
        setResponceMessage('Something went wrong!');
      }
    };
    sendRequest(
      {
        url: `http://localhost:3030/api/v1/content/posts${id}`,
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          title: enteredTitle,
          photoCaption: enteredPhotoCaption,
          featuredImage: uploadedFile,
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
  };

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
    setShowButtons(false);
  };

  const featuredImageResponseHandler = (data) => {
    setUploadedFile(data.url);
  };

  const confirmDeletePost = (e) => {
    e.preventDefault();
    setShowModal(true);
    setShowButtons(true);
    setResponceMessage('Are you sure you want to DELETE This post');
  };

  const deletePostHandler = (e) => {
    e.preventDefault();
    setShowButtons(false);
    const response = (res) => {
      if (res.status === 'success') {
        setResponceMessage('Post Deleted');
        setTimeout(() => {
          navigate('/posts');
        }, 1000);
      } else {
        setResponceMessage('Something went wrong!');
      }
    };

    sendRequest(
      {
        url: `http://localhost:3030/api/v1/content/posts/${props.id}`,
        method: 'DELETE',
      },
      response
    );
  };

  const publishPostHandler = () => {
    if (
      !enteredTitleIsValid ||
      !enteredAuthorIsValid ||
      !enteredDateIsValid ||
      !enteredDescriptionIsValid ||
      !enteredSlugIsValid ||
      !enteredPhotoCaptionIsValid ||
      !enteredTagsIsValid
    ) {
      titleBlurHandler();
      authorBlurHandler();
      tagsBlurHandler();
      descriptionBlurHandler();
      slugBlurHandler();
      photoCaptionBlurHandler();

      setShowModal(true);
      setResponceMessage(
        'There can not be empty fields in Post! Must be complete before Pubishing'
      );
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      return;
    }

    const response = (res) => {
      setShowModal(true);
      if (res.status === 'success') {
        setResponceMessage('Post published');
        resetAuthorInput();
        resetDateInput();
        resetDescriptionInput();
        resetPhotoCaptionInput();
        resetTagsInput();
        resetTitleInput();
        resetslugInput();
        editorStore.setData('');
      } else {
        setResponceMessage('Something went wrong!');
      }
    };

    const publish = published === 'published' ? 'draft' : 'published';
    sendRequest(
      {
        url: `http://localhost:3030/api/v1/content/posts/${props.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          published: publish,
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

    setTimeout(() => {
      navigate('/posts');
    }, 1000);
  };

  useEffect(() => {
    if (!props.id) {
      console.log('No Props ID');
      return;
    }
    const applyPost = (data) => {
      setPost(data.data);
    };

    sendRequest(
      {
        url: `http://localhost:3030/api/v1/content/posts/${props.id}`,
        method: 'POST',
      },
      applyPost
    );
  }, [sendRequest, props.id]);

  useEffect(() => {
    if (post) {
      console.log(post);
      setPublished(post.published);
      setUploadedFile(post.featuredImage);
      setEnteredTitle(post.title);
      setEnteredAuthor(post.author);
      setEnteredDate(post.dateModified.split('T')[0]);
      setEnteredDescription(post.description);
      setEnteredSlug(post.slug);
      setEnteredPhotoCaption(post.photoCaption);
      setEnteredTags(post.tags);
      editorStore.setData(post.postBody);
    }
  }, [post]);

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div className="modal">
            <h3>{responceMessage}</h3>
            {showButtons && (
              <div className={classes.modalMenu}>
                <button onClick={deletePostHandler}>OK</button>
                <button onClick={showModalHandler}>Cancel</button>
              </div>
            )}
          </div>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}

      <form id="postForm" onSubmit={cmsFormSumbitHandler}>
        <h2 className={classes.title}>
          {props.id || postId ? 'Edit Post' : 'Add new Post'}
        </h2>
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
          <ImageInput response={featuredImageResponseHandler}>
            {uploadedFile && (
              <div className={classes.featuredImage}>
                <p>Featured Image</p>
                <img alt="some here" src={uploadedFile} />
              </div>
            )}
          </ImageInput>

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
        <div className={classes.description}>
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
        <h3 className={classes.title}>Post Body</h3>
        <RichTextEditor
          valueChangeHandler={valueChangeHandler}
          editor={editorStoreHandler}
        />
      </form>

      <div className={classes.bottomMenu}>
        <button type="submit" form="postForm" className={classes.saveBtn}>
          Save
        </button>
        <button className={classes.publishBtn} onClick={publishPostHandler}>
          {published === 'published' ? 'Unpublish' : 'Publish'}
        </button>
        {props.id && (
          <button className={classes.deleteBtn} onClick={confirmDeletePost}>
            Delete
          </button>
        )}
      </div>
      <RightSideBar>
        <PostMenu
          onPublish={publishPostHandler}
          onSave={cmsFormSumbitHandler}
          onDelete={confirmDeletePost}
          postStatus={
            published === 'published'
              ? 'Published'
              : published === 'draft'
              ? 'Saved as Draft'
              : 'Unsaved'
          }
        />
      </RightSideBar>
    </Fragment>
  );
};
export default CMSForm;
