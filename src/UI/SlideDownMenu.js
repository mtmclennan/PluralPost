import classes from './SlideDownMenu.module.css';

const SlideDownMenu = (props) => {
  return (
    <div className={classes.menu}>
      <button onClick={props.onClick1} id={props.id}>
        {props.buttonLabel1}
      </button>
      {props.onClick2 && (
        <button onClick={props.onClick2} id={props.id}>
          {props.buttonLabel2}
        </button>
      )}
    </div>
  );
};

export default SlideDownMenu;
