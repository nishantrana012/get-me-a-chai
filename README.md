# Get Me A Chai

Get Me A Chai is a small crowdfunding platform for creators. A creator signs in with GitHub, configures a public profile and Razorpay account, then shares a personal page where supporters can contribute in INR and leave a message.

## Features

- GitHub OAuth authentication with NextAuth.js
- Creator dashboard for editing profile, username, profile image, cover image, and Razorpay credentials
- Public creator pages at `/<username>`
- Razorpay Checkout donations in Indian rupees
- Preset donation amounts of ₹5, ₹10, ₹20, ₹50, and ₹100
- Optional supporter name and message
- Razorpay signature verification before a payment is marked complete
- Top 10 completed contributions displayed on each creator page
- Responsive UI built with Tailwind CSS
- Success and failure notifications with React Toastify

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [NextAuth.js](https://next-auth.js.org/) for GitHub authentication
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Razorpay](https://razorpay.com/) for payment orders and verification
- [Tailwind CSS](https://tailwindcss.com/) 4
- ESLint with the Next.js Core Web Vitals configuration

## Requirements

- Node.js 20 or newer
- npm
- A running MongoDB instance
- A GitHub OAuth application
- A Razorpay account with API credentials for each creator who accepts donations

## Getting Started

1. Clone the repository and enter the project directory:

	```bash
	git clone https://github.com/nishantrana012/get-me-a-chai
	```
	```bash
	cd get-me-a-chai
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Start MongoDB and create the database connection expected by the app:

	```text
	mongodb://localhost:27017/chai
	```

	The current database connection is defined in `db/connectDb.js`. It is not read from an environment variable yet.

4. Create a `.env.local` file in the project root:

	```env
	GITHUB_ID=your_github_oauth_client_id
	GITHUB_SECRET=your_github_oauth_client_secret
	MONGO_URI=your_db_url
	NEXT_PUBLIC_URL=http://localhost:3000
	```

5. In your GitHub OAuth application, set the authorization callback URL to:

	```text
	http://localhost:3000/api/auth/callback/github
	```

6. Start the development server:

	```bash
	npm run dev
	```

7. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server after building |
| `npm run lint` | Run ESLint |

## Application Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Landing page and project introduction | Public |
| `/about` | Project overview and technology summary | Public |
| `/login` | GitHub sign-in page | Public |
| `/dashboard` | Edit the signed-in creator's profile and Razorpay details | Authenticated |
| `/<username>` | Public creator page, donation form, and supporter list | Public |
| `/api/auth/[...nextauth]` | NextAuth authentication endpoints | Internal |
| `/api/razorpay` | Razorpay payment callback and signature verification | Internal |

## How It Works

1. A creator selects **Login** and authenticates through GitHub.
2. The app creates a MongoDB user record on the first successful sign-in and generates a unique username.
3. The creator opens the dashboard, adds profile details, and enters their Razorpay key ID and secret.
4. The creator shares their public URL, for example `http://localhost:3000/janedoe123`.
5. A supporter enters their name, contribution amount, and message, or selects a preset amount.
6. The server creates a Razorpay order and stores a pending payment record.
7. Razorpay sends the result to `/api/razorpay`. The app validates the Razorpay signature and marks the payment as complete only when verification succeeds.
8. Completed payments appear in the creator's supporter list, sorted by amount and limited to the top 10.

## Data Models

### User

Stores the creator's name, email, unique username, profile and cover image URLs, Razorpay key ID, Razorpay secret, and timestamps.

### Payment

Stores the supporter name, creator reference, Razorpay order ID, message, amount, currency, completion status, and timestamps. Only payments with `done: true` are shown publicly.

## Project Structure

```text
app/                  Next.js routes and pages
  [username]/         Public creator pages
  api/                Authentication and Razorpay callback routes
  dashboard/          Creator dashboard
  login/              GitHub login page
actions/              Server actions for users, profiles, and payments
components/           Navbar, footer, session provider, and payment UI
db/                   MongoDB connection helper
models/               Mongoose User and Payment schemas
public/               Chai and interface image assets
```

## Environment and Security Notes

- `.env.local` is ignored by Git. Never commit GitHub, NextAuth, or Razorpay secrets.
- Use a strong, random `NEXTAUTH_SECRET` outside local development.
- The current application stores each creator's Razorpay secret in the `User` document. For a production deployment, encrypt provider secrets at rest and avoid exposing them to browser code.
- The current MongoDB URI is hard-coded for local development in `db/connectDb.js`. Configure it through a server-only `MONGODB_URI` variable before deploying to a hosted database.
- Set `NEXT_PUBLIC_URL` to the deployed HTTPS origin in production so Razorpay redirects back to the correct creator page.
- Razorpay credentials must belong to the creator receiving the contribution. Test with Razorpay test-mode keys before accepting live payments.

## Deployment

The app can be deployed to a Next.js-compatible host such as Vercel:

1. Provision a hosted MongoDB database.
2. Configure the required environment variables in the hosting provider.
3. Add the production GitHub OAuth callback URL:

	```text
	https://your-domain.example/api/auth/callback/github
	```

4. Set `NEXT_PUBLIC_URL` to `https://your-domain.example`.
5. Run the production build and start commands:

	```bash
	npm run build
	npm start
	```

Before going live, move the MongoDB URI to an environment variable, protect stored Razorpay secrets, and test successful, failed, and cancelled Razorpay payments.
