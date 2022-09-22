import Card from '../../UI/Card';

const PreviewPost = (props) => {
  console.log(props.data);
  return (
    <Card>
      <div>Latest</div>
      <div>
        <ul>
          {props.data.data.map((item) => (
            <li key={item._id}>
              <p>{item.title}</p>
              <p>{item.date}</p>
              <p>{item.tags}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default PreviewPost;
