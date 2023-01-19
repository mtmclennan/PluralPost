import React from 'react';
import EmailForm from '../components/forms/EmailForm';
import { useParams } from 'react-router-dom';

const Email = () => {
  const params = useParams();

  return <EmailForm id={params.id} />;
};

export default Email;
