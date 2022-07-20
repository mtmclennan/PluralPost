import { Fragment, useState } from 'react';

import LargeTextBox from '../../components/CMSInputs/LargeTextBox';
import SmallTextBox from '../../components/CMSInputs/smallTextBox';
import DateField from '../../components/CMSInputs/dateField';
import ImageInput from '../../components/CMSInputs/ImageInput';
import RichTextEditor from '../CMSInputs/RichTextEditor';

const CMSForm = () => {
  const cmsFormSumbitHandler = (e) => {
    e.preventDefault();
  };

  const getValueHandler = (value) => {
    console.log(value);
  };

  return (
    <form onSubmit={cmsFormSumbitHandler}>
      <h2>Add New Post</h2>
      <div className="form__grid">
        <SmallTextBox fieldName="Title" className="wide" />
        <ImageInput />
        <SmallTextBox fieldName="Photo caption" />
        <SmallTextBox fieldName="Slug" />
        <SmallTextBox fieldName="Tags" />
        <SmallTextBox fieldName="Author" />
        <DateField fieldName="Date" />
      </div>
      <LargeTextBox getValue={getValueHandler} fieldName="Meta description" />
      <h2>Using CKEditor 5 build in React</h2>

      <RichTextEditor />
    </form>
  );
};
export default CMSForm;
