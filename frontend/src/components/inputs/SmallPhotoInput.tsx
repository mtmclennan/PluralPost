import React, { Fragment, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { UserRes } from '../../types/index.type';

type SmallPhotoInputProps = {
  response: (res: UserRes) => void;
  className?: string;
};

const SmallPhotoInput = ({ response, className }: SmallPhotoInputProps) => {
  const { sendRequest } = useHttp();
  const inputRef = useRef<HTMLInputElement>(null);

  const url = `${process.env.REACT_APP_SERVER_URL}/users/updateMe`;

  const sendImageHandler = (file: File) => {
    if (file) {
      let data = new FormData();
      data.append('photo', file);
      // axios.post('/files', data)...

      sendRequest(
        {
          url,
          method: 'PATCH',
          headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            // Authorization: `Bearer ${TOKEN}`,
          },
          body: data,
          photo: true,
        },
        response
      );
    }
  };

  const photoChangeHandler = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      // handleFiles(e.target.files);

      const file = event.currentTarget.files[0];

      sendImageHandler(file);
    }
  };

  const onClickHandler = (event: React.UIEvent) => {
    event.preventDefault();

    inputRef.current!.click();
  };

  return (
    <Fragment>
      <button className={className} onClick={onClickHandler}>
        Change Photo
      </button>
      <input
        className="hidden"
        ref={inputRef}
        multiple={true}
        type="file"
        onChange={photoChangeHandler}
      />
    </Fragment>
  );
};

export default SmallPhotoInput;
