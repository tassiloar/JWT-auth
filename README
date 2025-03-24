
# Authentication System with JWT and Google OAuth

This project implements a secure authentication flow using **Next.js** (App Router), **JWT-based authentication**, and **Google OAuth2**. It allows users to sign up, log in, and manage sessions with access and refresh tokens.

---

## Features

- 🔐 **User Authentication**
  - Sign up with email/password
  - Sign in with email/password
  - Sign up & log in via Google OAuth
- 🍪 **Token Management**
  - Secure storage of JWT access and refresh tokens via cookies
  - Automatic token refreshing via backend verification
- ⚙️ **Session Handling**
  - Logout with cookie invalidation
  - Password hashing with bcrypt
- 🧩 **MongoDB Integration**
  - User storage with role management and registration type tracking (CRED/OAUTH)

---

## Tech Stack

- **Frontend**: React (Next.js App Router)
- **Backend**: Node.js (API Routes), JWT
- **Database**: MongoDB (via `clientPromise`)
- **Authentication**: Google OAuth2, bcrypt, jsonwebtoken

---

## File Structure Overview

```
/pages
  └── login.jsx       # Login form + Google login link
  └── signup.jsx      # Signup form + Google signup link
  └── home.jsx        # Home page with logout
  └── layout.js       # Root layout and metadata

/api
  └── login           # Login route for credentials
  └── signup          # Signup route (credentials/OAuth)
  └── googleAuth      # Handles Google OAuth flow
  └── verifyToken     # Middleware to verify/refresh JWTs
  └── removeAuthTokens# Logout route – clears tokens
```

---

## Environment Variables

Create a `.env.local` file and set the following:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET_ID=your_google_secret
NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL=http://localhost:3000/api/googleAuth
JWT_SECRET_KEY=your_jwt_secret
JWT_REFRESH_SECRET_KEY=your_jwt_refresh_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Access the App**

   Open `http://localhost:3000` in your browser.

---

## Security Notes

- Passwords are hashed securely with **bcrypt**.
- **JWT tokens** are signed and stored in **cookies** with `Secure`, `SameSite`, and `HttpOnly` flags where appropriate.
- **Access tokens** expire in 1 hour; **refresh tokens** expire in 7 days and are used to silently refresh sessions.

---



