import WebsiteList from '../components/websites/WebsiteList';

export interface Website {
  _id: string;
  name: string;
  url: string;
  category: string;
  logo: string;
  createdAt: Date | undefined;
}

export interface WebsiteData {
  websites: {
    data: Website[];
  };
}

export interface User {
  email: string;
  name: string;
  role: string;
  _id: string;
}

export interface UserData {
  data: User[];
}

export interface Res {
  status: string;
}

export interface WebsiteRes {
  status: string;
  data: Website;
}

export type ErrorWithMessage = {
  message: String;
};

export interface Post {
  _id: string;
  title: string;
  featuredImage: string;
  photoCaption: string;
  tags: string;
  slug: string;
  author: string;
  dateModified: string;
  description: string;
  postBody: string;
  published: string;
}

export interface PostData {
  data: Post[];
}

export interface Subscriber {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface SubscriberData {
  data: Subscriber[];
}
