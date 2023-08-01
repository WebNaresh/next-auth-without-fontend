This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
NextAuth with MongoDB(mongoose) + Server Actions

I. Main functions.

SignIn with OAuth ( Google )
SignIn with Credentials ( Email, Password )
SignUp with Name, Email, Password
Verify Email
Update Profile
Change Password
Forgot Password
Middleware to secure certain pages
II. Implementation Guide.

Setup Nextjs - npx create-next-app@latest ./ √ Would you like to use TypeScript with this project? ... No √ Would you like to use ESLint with this project? ... No √ Would you like to use Tailwind CSS with this project? ... No √ Would you like to use src/ directory with this project? ... No √ Use App Router (recommended)? ... Yes √ Would you like to customize the default import alias? ... No

- next: "13.4.7" or Later
- next.config:
  experimental:{
  serverActions: true
  }
  Setup Libraries - npm i mongoose next-auth bcrypt jsonwebtoken nodemailer

Config Next-Auth - context => Provider - api/auth/[...nextauth]/route.js - .env

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_SECRET ( openssl rand -base64 32 )
Header Component and Pages - Protected (client, server) - Profile (client, server) - Signin, SignUp - Admin Dashboard

SignIn with Oauth ( Google ) without Database - Import GoogleProvider - Access to Google Cloud Console to get ( GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET )

https://console.cloud.google.com/
create a new project
APIs & Services => Credentials => CREATE CREDENTIALS => OAuth client ID => Web application => Authorized JavaScript origins ( http://localhost:3000 ) => Authorized redirect URIs ( http://localhost:3000/api/auth/callback/google )

- SignIn Component
- Google Login Button
  SignOut and Middleware keep the site protected - SignOut component - Middleware
  export {default} from 'next-auth/middleware'
  export const config = { matcher: ["/profile/:path*", "/protected/:path*", "/dashboard/:path*"] }
- Protected Page Render
  Setup MongoDB (mongoose) - Models ( user ) - Connect to MongoDb

SignIn with Oauth ( Google ) with Database (mongoose) - callbacks: { async signIn({ user, account, profile, email, credentials }) { return true; }, async jwt({token, trigger, session}){ return token; }, async session({session, token}){ return session; } }

- async signIn => signInWithOAuth
- async jwt => getUserByEmail
- async session => session.user = token.user
  Profile Page Render - Profile Component - ProfileCard Component - nextConfig = { images: { domains: ["lh3.googleusercontent.com", "images.pexels.com"] } }
- restart => npm run dev
  Update User Profile - ProfileUpdate Component - Form Component - updateUser Action - Button Component

Update and Re-Render User Profile - update({name, image}) on Client-Side - Fix Re-Render on Server Side

The page server side only renders for the first time,
The next times will not re-render, so we will combine with the client side.
The first time will render the server side, the next time will render the client side.
Sign Up with Credentials (name, email, password) - SignUp Component - signUpWithCredentials Action

Handle Errors - Errors page

Token + Send Email - .env

TOKEN_SECRET=YOUR_SECRET ( openssl rand -base64 32 )
EMAIL_USER
EMAIL_PASSWORD
Verify Email to complete the registration - Verify Page - verifyEmailWithCredentials Action

SignIn with Credentials (email, password) - import CredentialsProvider - async authorize => signInWithCredentials Action

Change Password - ChangePassword Component - userActions => changePassword

Forgot Passoword - authActions => forgotPasswordWithCredentials

Reset Password - reset_password page - ResetPassword Component - authActions => resetPasswordWithCredentials

Middleware protect routes based on role Admin

Deploy Vercel - run build => test - push to github - deploy vercel - config NEXTAUTH_URL in Environment Variables => re-deploy - config in Google Cloud Console
