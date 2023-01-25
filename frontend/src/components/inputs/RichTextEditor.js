import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

const RichTextEditor = ({ setEditor, valueChangeHandler, website, id }) => {
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/content/${website}/images/${id}`;
  const TOKEN = process.env.REACT_APP_PHOTO_TOKEN;
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: SERVER_URL,

          // Enable the XMLHttpRequest.withCredentials property.
          withCredentials: true,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.

        setEditor(editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        valueChangeHandler(data);
      }}
      // onBlur={(event, editor) => {}}
      // onFocus={(event, editor) => {}}
    />
  );
};

export default RichTextEditor;
