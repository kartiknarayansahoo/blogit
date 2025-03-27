import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


// need to provide Bindings to pass on DATABASE_URL from wrangler.jsonc
// so that the types are handled correctly in typescript
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string,
    prisma: any
  }
}>();

// middleware
// enabling cors
app.use('/*', cors())


// passing prisma client to all routes
app.use('/*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  c.set('prisma', prisma);

  await next();
})

// routing
app.route('/api/v1/user/', userRouter);
app.route('/api/v1/blog/', blogRouter);


export default app
