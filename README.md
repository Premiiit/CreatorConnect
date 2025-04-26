# CreatorsConnect

CreatorsConnect is a platform where creators can connect with their fans directly. Fans can support creators by donating, sending personal messages, and engaging through posts, likes, and comments.

## Features

- 🔒 **Authentication**
  - Login with GitHub
  - Login with Google (powered by NextAuth.js)

- 💸 **Support Creators**
  - Fans can donate money securely using Razorpay.
  - Fans can send a personal message to the creator while donating.
  - Top donations are showcased on the creator's dashboard.

- 🔥 **Upcoming Features**
  - Creators can post updates, photos, or announcements.
  - Fans can like and comment on posts to interact with creators.
  - Creator profiles showcasing their bio, social links, and previous posts.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Authentication**: NextAuth.js
- **Payments**: Razorpay Integration
- **Database**: (Specify your database here if applicable)
- **Hosting**: (Vercel / Netlify / Your server)

## Getting Started

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/creatorsconnect.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file at the root of your project and add the following:

```env
# GitHub OAuth Credentials
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth Secret
NEXTAUTH_SECRET=your_nextauth_secret

# Razorpay API Keys
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# (Optional) NextAuth URL (useful when deploying)
NEXTAUTH_URL=http://localhost:3000
```
4. run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
  ```
