# Sveltekit & Hono
<img src="./screenshot/ss.webp" alt="Screenshot" />
Simple CRUD using Sveltekit and Hono. This project was created as learning material for me to learn "How to Make an API" using Hono and using the API that I have created using Sveltekit.

## Frontend
For the frontend I use:
- [Sveltekit](https://kit.svelte.dev/)
- [picocss](https://picocss.com/)
- [Svelte Sonner](https://github.com/wobsoriano/svelte-sonner)

```bash
# Clone this project
$ git clone https://github.com/suryamsj/sveltekit-hono

# Access
$ cd sveltekit-hono/frontend

# Install dependencies
$ npm install

# Run the project
$ npm run dev

# The server will initialize in the <http://localhost:5173>
```

## Backend
For the backend I use:
- [Hono](https://hono.dev/)
- [Prisma](https://www.prisma.io/)

```bash
# Clone this project
$ git clone https://github.com/suryamsj/sveltekit-hono

# Access
$ cd sveltekit-hono/backend

# Install dependencies
$ npm install

# Prisma init
$ npx prisma init --datasource-provider sqlite

# Copy prisma schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Users {
  id         String   @id @default(cuid())
  name       String
  phone      String
  address    String
  created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
}

# create migration
$ npx prisma migrate dev --name init

# Run the project
$ npm run dev

# The server will initialize in the <http://localhost:3000>
```