import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import users from "./api/user";

const app = new Hono()

app.get('/', (c) => c.json({ message: "Welcome!" }))
app.route('/users', users)

export default app

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
