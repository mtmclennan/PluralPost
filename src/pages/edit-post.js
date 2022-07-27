import CMSForm from '../components/forms/CMSFormNew';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const params = useParams();

  return <CMSForm id={params.postId} />;
};

export default EditPost;
