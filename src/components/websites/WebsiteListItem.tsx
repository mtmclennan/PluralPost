import { LiOnClick } from '../../types/index.type';

type WebsiteListItemProps = {
  onClick?: (Event: LiOnClick) => void;
  id?: string;
  logo?: string;
  name: string;
  category: string;
  url?: string;
};

const WebsiteListItem = ({
  onClick,
  id,
  logo,
  name,
  category,
  url,
}: WebsiteListItemProps) => {
  return (
    <li className="website-list__row" onClick={onClick} id={id}>
      <img className="logo" src={logo} alt="logo" />
      <p>{name}</p>
      <p>{category}</p>
      <p>{url}</p>
    </li>
  );
};

export default WebsiteListItem;
