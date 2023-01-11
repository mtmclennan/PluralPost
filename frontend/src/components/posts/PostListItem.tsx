import { LiOnClick } from '../../types/index.type';
import classes from './PostsListItem.module.css';

type PostListItemProps = {
  date: string;
  id: string;
  title: string;
  author: string;
  published: string;
  tags: string;
  onClick: (event: LiOnClick) => void;
};

const PostListItem = ({
  date,
  id,
  title,
  author,
  published,
  tags,
  onClick,
}: PostListItemProps) => {
  let dateFormated;
  if (date) {
    dateFormated = date.split('T')[0];
  }

  return (
    <li className={classes.item} onClick={onClick} id={id}>
      <p>{title}</p>
      {dateFormated && <p>{dateFormated}</p>}
      <p>{author}</p>
      <p>{published}</p>
      <p>{tags}</p>
    </li>
  );
};

export default PostListItem;
