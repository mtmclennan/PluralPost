export interface Website {
  _id: string;
  name: string;
  url: string;
  category: string;
  logo: string;
  createdAt: Date | undefined;
  email: string;
  emailFromSite: boolean;
  slogan?: string;
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

export interface EmailRes {
  status: string;
  data: Email;
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

export interface Email {
  _id: string;
  subject: string;
  author: User;
  dateModified: string;
  dateSent?: string;
  status: string;
  message: string;
}
