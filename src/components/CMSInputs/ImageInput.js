import { useState, useRef } from 'react';
import useHttp from '../../hooks/use-http';

const ImageInput = (props) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);

  const { isLoading, sendRequest } = useHttp();

  const TOKEN = process.env.REACT_APP_PHOTO_TOKEN;

  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const sendImageHandler = (file) => {
    if (file) {
      let data = new FormData();
      data.append('upload', file);
      // axios.post('/files', data)...

      sendRequest(
        {
          url: 'http://localhost:3030/api/v1/content/photo',
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: `Bearer ${TOKEN}`,
          },
          body: data,
          photo: true,
        },
        props.response
      );
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);

      const file = e.dataTransfer.files[0];
      sendImageHandler(file);
    }
  };

  // triggers when file is selected with click
  const imageChangeHandler = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);

      const file = e.target.files[0];

      sendImageHandler(file);
    }
  };
  // triggers the input when the button is clicked
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const hiddenClass = props.children ? 'hidden' : '';

  return (
    <div>
      {props.children}
      {props.children && <button onClick={onButtonClick}>Change Image</button>}
      <div
        className={hiddenClass}
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={imageChangeHandler}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? 'drag-active' : ''}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </div>
    </div>
  );
};
export default ImageInput;
