# PluralPost API Documentation

Base URL (dev): `http://localhost:3030/api/v1`

> Most authenticated routes rely on the `jwt` cookie set by `POST /users/login`.
> Frontend requests should include credentials.

## Conventions

- **Content-Type:** `application/json` unless uploading files.
- **Auth:** Cookie-based JWT for protected endpoints.
- **Tenanting:** Many resources use `:website` path segment and are scoped per website.

---

## Authentication & Users

### POST `/users/signup`

Create a user. Route is protected and admin-only once an admin exists.

**Body**

```json
{
  "name": "Jane Admin",
  "email": "jane@example.com",
  "password": "password1234",
  "passwordConfirm": "password1234",
  "role": "editor"
}
```

### POST `/users/login`

Authenticate user and set JWT cookie.

**Body**

```json
{
  "email": "jane@example.com",
  "password": "password1234"
}
```

### GET `/users/getUser`

Returns currently logged-in user if JWT cookie is valid.

### GET `/users/logout`

Clears authentication cookie.

### POST `/users/forgotPassword`

Sends password reset email.

**Body**

```json
{
  "email": "jane@example.com"
}
```

### PATCH `/users/resetPassword/:token`

Reset password using token from email.

**Body**

```json
{
  "password": "newPassword1234",
  "passwordConfirm": "newPassword1234"
}
```

### PATCH `/users/updateMyPassword` (protected)

Change password for authenticated user.

### GET `/users/me` (protected)

Get authenticated user profile.

### PATCH `/users/updateMe` (protected)

Update authenticated profile (supports user image upload flow in app).

### DELETE `/users/deleteMe` (protected)

Deactivate/delete authenticated profile.

### GET `/users` (admin)

List all users.

### GET `/users/:id` (admin)

Get user by ID.

### DELETE `/users/:id` (admin)

Delete user by ID.

---

## Websites

### GET `/websites/` (protected)

List all websites.

### POST `/websites/` (admin/editor)

Create website metadata.

**Body**

```json
{
  "name": "mySite",
  "url": "https://example.com",
  "category": "tech",
  "slogan": "Notes and news",
  "email": "hello@example.com",
  "emailFromSiteName": true,
  "logo": "https://cdn.example.com/logo.png"
}
```

### GET `/websites/:id` (protected)

Get one website.

### PATCH `/websites/:id` (admin/editor)

Update website metadata.

---

## Content (Posts & Images)

### GET `/content/:website/articles`

Public-style endpoint for published posts only.

### POST `/content/:website/post/:slug`

Get a single post by slug.

### POST `/content/:website/images/:id` (admin/editor/user)

Upload inline post image.

- **Content-Type:** `multipart/form-data`
- File field name: `upload`

Returns image URL.

### POST `/content/:website/featured-image/:id` (admin/editor/user)

Upload featured image and update post.

- **Content-Type:** `multipart/form-data`
- File field name: `upload`

### POST `/content/:website/posts` (admin/editor/user)

Create a post.

**Body**

```json
{
  "title": "My Post",
  "featuredImage": "https://...",
  "photoCaption": "optional",
  "tags": "news,updates",
  "slug": "my-post",
  "author": "Jane Admin",
  "dateModified": "2026-01-01T00:00:00.000Z",
  "description": "summary",
  "postBody": "<p>content</p>"
}
```

### GET `/content/:website/posts` (protected)

List all posts for website.

### POST `/content/:website/posts/:id` (protected)

Get one post by ID.

### PATCH `/content/:website/posts/:id` (admin/editor/user)

Update post.

- On successful update, backend may trigger a revalidation/build hook for the website URL.

### DELETE `/content/:website/posts/:id` (admin/editor/user)

Delete post.

---

## Subscribers

### GET `/subscribers/:website/subscribers` (protected)

List subscribers for website.

### POST `/subscribers/:website/subscribers` (admin)

Create subscriber and send welcome email.

**Body**

```json
{
  "name": "Reader One",
  "email": "reader@example.com",
  "website": "mySite"
}
```

### DELETE `/subscribers/:website/delete/:id` (admin/editor)

Delete subscriber.

### POST `/subscribers/:website/email` (protected)

Send email to all subscribers for website.

**Body**

```json
{
  "subject": "Monthly update",
  "message": "<p>Hello subscribers...</p>",
  "sender": "My Site Team"
}
```

---

## Email Drafts/Campaigns

### POST `/email/:website/emails` (admin/editor/user)

Create email draft.

**Body**

```json
{
  "subject": "Campaign subject",
  "message": "<p>Email content</p>",
  "dateModified": "2026-01-01T00:00:00.000Z"
}
```

### GET `/email/:website/emails` (protected)

List all saved emails for website.

### POST `/email/:website/emails/:id` (protected)

Get one saved email by ID.

### PATCH `/email/:website/emails/:id` (admin/editor/user)

Update email draft status/content.

If `status` is set to `SEND`, backend sends to all subscribers and persists status as `SENT`.

**Body**

```json
{
  "subject": "Campaign subject",
  "message": "<p>Email content</p>",
  "status": "SEND"
}
```

---

## Typical auth flow

1. `POST /users/login` with email/password.
2. Server sets `jwt` HTTP-only cookie.
3. Call protected endpoints with `credentials: include`.
4. Use `GET /users/getUser` to restore session on app load.
5. `GET /users/logout` to end session.

## Error responses

Common API error shape:

```json
{
  "status": "fail",
  "message": "Human-readable error message"
}
```

Production hides unknown internal details; development may include stack and raw error details.
