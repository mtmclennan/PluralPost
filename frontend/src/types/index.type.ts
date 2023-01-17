export type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type SetStateNumber = React.Dispatch<React.SetStateAction<number>>;

export type FormEvent = React.FormEvent<HTMLFormElement>;

export type LiOnClick = React.UIEvent<HTMLLIElement>;

export type ButtonOnClick = React.UIEvent<HTMLButtonElement>;

export type User = {
  email: string;
  name: string;
  role: string;
  photo: string;
};

export type Website = {
  _id: string;
  name: string;
  url: string;
  category: string;
  logo: string;
  createdAt: Date | undefined;
};

export type Context = {
  isLoggedIn: boolean;
  website: Website;
  user: User;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onWebsiteSelect: (website: Website) => void;
  onWebsiteReset: () => void;
};

export type UserRes = {
  status: string;
  user: { email: string; name: string; role: string; photo: string };
};
