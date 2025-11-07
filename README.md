This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Mock Mode

This frontend is currently configured to run in **mock mode** by default, which means it works without a backend connection. This is perfect for deploying and showcasing the UI/UX.

### Demo Credentials

You can log in with the following demo credentials:
- **Email:** `demo@example.com`
- **Password:** `demo123`

### Features Available in Mock Mode

- ✅ Full authentication flow (login/register)
- ✅ Dashboard with statistics
- ✅ Resume management (view, create, delete)
- ✅ Portfolio page with full portfolio data
- ✅ Analytics page with charts and metrics
- ✅ Settings page with user preferences
- ✅ File upload simulation

### Switching to Real Backend

To connect to a real backend, set the `NEXT_PUBLIC_API_URL` environment variable:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api npm run dev
```

Or create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

The app will automatically detect if the API URL is configured and switch from mock mode to real API mode.

### Mock Data

All mock data is stored in `src/lib/mock-data.ts`. You can modify this file to customize the demo experience.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
