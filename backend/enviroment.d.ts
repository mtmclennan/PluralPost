declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      DATABASE: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      IMAGE_STORAGE_POSTS: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_COOKIE_EXPIRES_IN: number;
      JWT_PHOTO: string;
      EMAIL_HOST: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      EMAIL_PORT: number;
      EMAIL_FROM: string;
      REVALIDATE_TOKEN: string;
    }
  }
}

export {};
