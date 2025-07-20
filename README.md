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

<!-- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file. -->

<!--
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

## Docker Commands

### Development (with hot reload)

```bash
docker-compose -f docker-compose.dev.yml up
```

Runs the app in development mode with hot reloading.

### Production

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Builds and runs the app in production mode.

### Staging

```bash
docker-compose -f docker-compose.staging.yml up --build
```

Builds and runs the app in staging mode.

### Stop All Containers

```bash
docker-compose down
```

Stops and removes all running containers defined by the compose file.

### Clean Docker System

```bash
docker system prune -af
```

Removes all stopped containers, unused networks, and dangling images to free up space.
