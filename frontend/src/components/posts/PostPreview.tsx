import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { PostData } from '../../types/interfaces';
import LoadingSpinner from '../../UI/LoadingSpinner';

type PostPreviewProps = {
  website: string;
  total: (total: number) => void;
};

const PostPreview = ({ website, total }: PostPreviewProps) => {
  const { isLoading, sendRequest } = useHttp();
  const [allPosts, setAllPosts] = useState<PostData>();

  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/content/${website}/posts`;

  useEffect(() => {
    sendRequest({ url: SERVER_URL }, (data: PostData) => {
      setAllPosts(data);
    });
  }, [sendRequest, SERVER_URL]);

  useEffect(() => {
    if (allPosts) {
      total(allPosts.data.length);
    }
  }, [allPosts, total]);

  return (
    <Fragment>
      <ul>
        {isLoading && <LoadingSpinner />}
        {allPosts &&
          allPosts.data.slice(0, 10).map((post) => {
            const draft = post.published === 'draft' ? '| Draft' : '';
            const publishDate =
              post.published === 'published' ? 'Published' : 'Last Modifed';
            return (
              <li key={post._id} className="preview-post__row">
                <div>
                  <div>
                    <strong className="preview-post__title">
                      <Link
                        className="preview-post__title"
                        to={`/edit-post/${post._id}`}
                      >
                        {post.title}
                      </Link>
                    </strong>
                    <strong className="preview-post__draft">{draft}</strong>
                  </div>

                  <p>{post.postBody.slice(0, 300)}...</p>
                  <Link
                    className="preview-post__edit"
                    to={`/edit-post/${post._id}`}
                  >
                    Edit
                  </Link>
                </div>
                <div>
                  <p>By - {post.author}</p>
                </div>
                <div>
                  <p>{publishDate}</p>
                  {post.dateModified && (
                    <p>{post.dateModified.split('T')[0]}</p>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default PostPreview;
