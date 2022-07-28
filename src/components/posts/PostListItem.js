import classes from './PostsListItem.module.css';

const PostListItem = (props) => {
  let date;
  if (props.date) {
    date = props.date.split('T')[0];
  }

  return (
    <li className={classes.item} onClick={props.onClick} id={props.id}>
      <p>{props.title}</p>
      {date && <p>{date}</p>}
      <p>{props.author}</p>
      <p>{props.published}</p>
      <p>{props.tags}</p>
    </li>
  );
};

export default PostListItem;
