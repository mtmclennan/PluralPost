import { useState, useRef } from 'react';
import useHttp from '../../hooks/use-http';

type ImageInputProps = {
  response: (res: { url: string }) => void;
  children?: React.ReactNode;
};

const ImageInput = ({ response, children }: ImageInputProps) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);

  const { sendRequest } = useHttp();

  const TOKEN = process.env.REACT_APP_PHOTO_TOKEN;

  const inputRef = useRef<HTMLInputElement>(null);

  // handle drag events
  const handleDrag = function (event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const sendImageHandler = (file: File) => {
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
        response
      );
    }
  };

  // triggers when file is dropped
  const handleDrop = function (event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);

      const file = event.dataTransfer.files[0];
      sendImageHandler(file);
    }
  };

  // triggers when file is selected with click
  const imageChangeHandler = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      // handleFiles(e.target.files);

      const file = event.currentTarget.files[0];

      sendImageHandler(file);
    }
  };
  // triggers the input when the button is clicked
  const onButtonClick = (event: React.UIEvent) => {
    event.preventDefault();

    inputRef.current!.click();
  };
  const hiddenClass = children ? 'hidden' : '';

  return (
    <div>
      {children}
      {children && <button onClick={onButtonClick}>Change Image</button>}
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
