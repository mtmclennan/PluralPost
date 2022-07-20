import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

const RichTextEditor = (props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: 'http://localhost:3030/api/v1/content/photo',

          // Enable the XMLHttpRequest.withCredentials property.
          withCredentials: true,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: 'Bearer <JSON Web Token>',
          },
        },
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
        props.editor(editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.valueChangeHandler(data);
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default RichTextEditor;
