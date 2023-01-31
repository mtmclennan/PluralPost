# PluralPost

## The ultimate CMS for managing and publishing content across multiple sites.

This headless CMS project was design with content creators with multiple websites in mind. It can do it all from one spot. Switch between your projects with the click of a button. Managing all your content from one location. It will also store and manage subscriber lists. Write and send bulk email to all of each sites subscribers easily. Allows multiple users, and user roles.

#### Current features

    - Write, edit, publish, unpublish, delete - Posts
    - Rich text editor CKEditor 5
    - Store subscriber email addresses
    - Write, edit, store, send email to all site subscribers
    - Users, user roles "admin", "editor", "user"
    - Sends build hook when a post is published or unpubished - for use with static site - NextJS On-Demand Incremental Static Regeneration

#### Technologies

ReactJS - frontend (Create React App)
NodeJS / ExpressJS - Backend
DB - MongoDB

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. watches TypeScript files and complies on changes.\

Nodejs/expressjs backend TypeScript files are compiled to the `/backend/dist` folder for production.

run `npm run build` to build the frontend app for production.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

API Routes are located at [http://localhost:3030/api/v1/](https:localhost:3030/api/v1/)

### `npm run build`

Builds the frontend app for production to the `/frontend/build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Required .env config files

### .env file in project folder /backend

NODE_ENV= "production | development"  
PORT= ex. "3030"  
DATABASE= MongoDb connection string ex "mongodb+srv://username:<password>@emailcluster1.hw4qb.mongodb.net/databaseName?retryWrites=true&w=majority"   
DATABASE_USERNAME= MongoDB username  
DATABASE_PASSWORD= MongoDB password  
CLIENT_URL= client side app location ex "http://localhost:3000" used for sending reset password link in email  
IMAGE_STORAGE_POSTS= location to store post images in ex. "dist/public/img/"  
JWT_SECRET= JWT secret key  
JWT_EXPIRES_IN= can be a string or number ex. "1d" = 1 day, "1h" = 1 hour, "1m" = 1 minute. Numbers = milliseconds ex. 1000 = 1000ms  
JWT_COOKIE_EXPIRES_IN= number = days ex. 1 = "1 day"  
JWT_PHOTO= Token for photo upload route - must match REACT_APP_PHOTO_TOKEN in frontend .env  
SERVER_URL= location of backend server ex "http://localhost:3030" or "https://example.com"  
EMAIL_HOST= email host smtp  
EMAIL_USERNAME= email host username  
EMAIL_PASSWORD= email host password  
EMAIL_PORT= email host port  
EMAIL_FROM= sets from in emails for server to users emails ex. "PluralPost<service@pluralpost.com>"  
REVALIDATE_TOKEN= token for NextJS On-demand Revalidation - must match NextJS site token

### .env file in project folder /frontend

Do not put any sensitive information here. It is exposed on the client side.

#### Note .env.development for development - .env.production for production

##### .env.production values are built into the build package at build time.

REACT_APP_SERVER_URL= ex. "http://localhost:3030/api/v1" or "https://example.com"
REACT_APP_SERVER= ex. "http://localhost:3030/" or "https://example.com/"
REACT_APP_PHOTO_TOKEN= token for photo upload route, must match JWT_PHOTO in backend .env (note this is a security problem, needs to be fixed)

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
