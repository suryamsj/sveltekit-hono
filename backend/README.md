# Backend
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