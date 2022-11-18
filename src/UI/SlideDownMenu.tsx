import { ButtonOnClick } from '../types/index.type';
import classes from './SlideDownMenu.module.css';

type SlideDownMenuProps = {
  id: string;
  buttonLabel1: string;
  buttonLabel2?: string;
  onClick1: (event: ButtonOnClick) => void;
  onClick2?: (event: ButtonOnClick) => void;
};

const SlideDownMenu = ({
  id,
  onClick1,
  onClick2,
  buttonLabel1,
  buttonLabel2,
}: SlideDownMenuProps) => {
  return (
    <div className={classes.menu}>
      <button onClick={onClick1} id={id}>
        {buttonLabel1}
      </button>
      {onClick2 && (
        <button onClick={onClick2} id={id}>
          {buttonLabel2}
        </button>
      )}
    </div>
  );
};

export default SlideDownMenu;
