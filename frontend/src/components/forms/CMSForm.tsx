import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CMSForm.module.scss';
import ImageInput from '../inputs/ImageInput';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInput from '../../hooks/use-input';
import PostMenu from '../../components/posts/PostMenu';
import RichTextEditor from '../inputs/RichTextEditor';
import Modal from '../../UI/Modal';
import AuthContext from '../../store/auth-context';
import TopBar from '../../layout/TopBar';
import useModal from '../../hooks/use-modal';
import ModalButtons from '../../UI/ModalButtons';

type CMSFormProps = {
  id?: string;
};

interface Res {
  status: string;
  response?: string;
  data?: {
    _id: string;
  };
}

interface Post {
  title: string;
  featuredImage: string;
  photoCaption: string;
  tags: string;
  slug: string;
  author: string;
  dateModified: string;
  description: string;
  postBody: string;
  published: string;
}

const CMSForm = ({ id }: CMSFormProps) => {
  let navigate = useNavigate();
  const AuthCtx = useContext(AuthContext);

  const [post, setPost] = useState<Post>();
  const [published, setPublished] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const { isLoading, error, sendRequest } = useHttp();
  const [editorStore, setEditorStore] = useState<any>(null);
  const [richTextValue, setRichtextValue] = useState('');

  const {
    setModalMessage,
    showModal,
    hideModal,
    showModalButtons,
    modalMessage,
    setShowModalButtons,
  } = useModal(error);

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/content/${AuthCtx.website.name}/posts`;

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

  const valueChangeHandler = (data: string) => {
    setRichtextValue(data);
  };

  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  const cmsFormSumbitHandler = (
    event: React.FormEvent<HTMLFormElement> | React.UIEvent<HTMLButtonElement>
  ) => {
    if (event) event.preventDefault();

    const httpMethod = id ? 'PATCH' : 'POST';
    const idFromProps = id ? `/${id}` : '';

    const response = (res: Res) => {
      if (res.status === 'success') {
        setModalMessage('Post Saved');
        setTimeout(() => {
          hideModal();
          if (!id) {
            navigate(`/edit-post/${res.data!._id}`, { replace: true });
          }
        }, 300);
      } else {
        setTimeout(() => {
          hideModal();
        }, 3000);
        console.log(error);
        setModalMessage(error || 'Something went wrong!');
      }
    };
    sendRequest(
      {
        url: `${SERVER_URL}${idFromProps}`,
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

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

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
    hideModal();
  };

  const confirmDeletePost = () => {
    setModalMessage('Are you sure you want to DELETE This post');
    setShowModalButtons(true);
  };

  /////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  const deletePostHandler = () => {
    interface Res {
      status: string;
    }

    const response = (res: Res) => {
      if (res.status === 'success') {
        setModalMessage('Post Deleted');
        setTimeout(() => {
          hideModal();
          navigate('/posts');
        }, 1000);
      } else {
        setTimeout(() => {
          hideModal();
        }, 3000);

        setModalMessage(error || 'Something went wrong!');
      }
    };

    sendRequest(
      {
        url: `${SERVER_URL}/${id}`,
        method: 'DELETE',
      },
      response
    );
  };

  ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

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

      setModalMessage(
        'There can not be empty fields in Post! Must be complete before Pubishing'
      );
      setTimeout(() => {
        hideModal();
      }, 3000);
      return;
    }
    const publish = published === 'published' ? 'draft' : 'published';

    const response = (res: Res) => {
      if (res.status === 'success') {
        const postStatus =
          publish === 'published' ? 'Post Published' : 'Saved as Draft';
        const message =
          res.response === 'success'
            ? 'Site ReBuilding'
            : 'Error Building Site';

        setModalMessage(
          `${postStatus} 
          ${message}`
        );
        resetAuthorInput();
        resetDateInput();
        resetDescriptionInput();
        resetPhotoCaptionInput();
        resetTagsInput();
        resetTitleInput();
        resetslugInput();
        if (editorStore) {
          editorStore.setData('');
        }

        setTimeout(() => {
          hideModal();
          navigate('/posts');
        }, 1000);
      } else {
        setModalMessage(error || 'Something went wrong!');

        setTimeout(() => {
          hideModal();
        }, 3000);
      }
    };

    sendRequest(
      {
        url: `${SERVER_URL}/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          published: publish,
          title: enteredTitle,
          photoCaption: enteredPhotoCaption,
          featuredImage: uploadedFile,
          slug: enteredSlug,
          tags: enteredTags,
          author: enteredAuthor,
          dateModified: enteredDate,
          description: enteredDescription,
          postBody: richTextValue,
        },
      },
      response
    );
  };

  //Autosave /////////////////////////////

  // useEffect(() => {
  //   if (firstRender) return;
  //   let timer = setTimeout(() => {
  //     cmsFormSumbitHandler();
  //     console.log('save');
  //   }, 10000);
  //   return () => {
  //     console.log('clear');
  //     clearTimeout(timer);
  //   };
  // }, [richTextValue, firstRender, cmsFormSumbitHandler]);

  ////////////////////////////////////////////////////////////////////////////////////
  // useEffect()
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!id) {
      return;
    }

    const applyPost = (data: any) => {
      setPost(data.data);
    };

    sendRequest(
      {
        url: `${SERVER_URL}/${id}`,
        method: 'POST',
      },
      applyPost
    );
  }, [sendRequest, id, SERVER_URL]);

  useEffect(() => {
    if (post) {
      setPublished(post.published);
      setUploadedFile(post.featuredImage ? post.featuredImage : '');
      setEnteredTitle(post.title);
      setEnteredAuthor(post.author);
      setEnteredDate(post.dateModified.split('T')[0]);
      setEnteredDescription(post.description);
      setEnteredSlug(post.slug);
      setEnteredPhotoCaption(post.photoCaption);
      setEnteredTags(post.tags);
      editorStore.setData(post.postBody ? post.postBody : '');
    }
  }, [post]);

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <Fragment>
            {showModalButtons && <h3>Delete Post?</h3>}
            <p>{modalMessage}</p>
            {showModalButtons && (
              <ModalButtons
                onCancel={showModalHandler}
                onDelete={deletePostHandler}
              />
            )}
          </Fragment>
        </Modal>
      )}
      {isLoading && <LoadingSpinner />}
      <TopBar>
        <PostMenu
          id={id ? id : ''}
          onPublish={publishPostHandler}
          publishBtnText={published === 'published' ? 'Unpublish' : 'Publish'}
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
      </TopBar>
      <div className="container">
        <form id="postForm" onSubmit={cmsFormSumbitHandler}>
          <h2 className={classes.title}>{id ? 'Edit Post' : 'Add new Post'}</h2>
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
            <ImageInput
              setModalMessage={setModalMessage}
              hideModal={hideModal}
              setUploadedFile={setUploadedFile}
              website={AuthCtx.website.name}
              id={id}
            >
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
              rows={5}
              cols={80}
            ></textarea>
          </div>
          <h3 className={classes.title}>Post Body</h3>
          <RichTextEditor
            valueChangeHandler={valueChangeHandler}
            setEditor={setEditorStore}
            website={AuthCtx.website.name}
            id={id}
          />
        </form>

        <div className={classes.bottomMenu}>
          <button type="submit" form="postForm" className={classes.saveBtn}>
            Save
          </button>
          {id && (
            <Fragment>
              <button
                className={classes.publishBtn}
                onClick={publishPostHandler}
              >
                {published === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button className={classes.deleteBtn} onClick={confirmDeletePost}>
                Delete
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default CMSForm;
