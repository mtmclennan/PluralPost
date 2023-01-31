import { User } from './src/types/interfaces';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

declare module 'xss-clean' {
  const value: Function;

  export default value;
}

declare module '*.png';

declare module '*.jpeg';
