import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPost, updatePost } from '@kartik26/mediumzod'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
        prisma: any
    }
}>();

// middlewares
// auth middleware
blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";

    const token = jwt.split(' ')[1];
    let payload = null;
    try {
        payload = await verify(token, c.env.JWT_SECRET) as { id: string };
    }
    catch (e) {
        return c.json({ msg: "Not logged in/Invalid token" }, 401);
    }

    // passing userId to handler/route
    c.set('userId', payload.id);
    await next();
})


// routes
blogRouter.post('/', async (c) => {
    const prisma = c.get('prisma');
    const userId = c.get('userId');

    const body = await c.req.json();
    // zod validation
    const parsedInput = updatePost.safeParse(body);
    if (!parsedInput.success) {
        return c.json({
            msg: "invalid inputs",
            error: parsedInput.error
        }, 411);
    }

    const res = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    console.log(res)
    return c.json({
        msg: "added post",
        blogId: res.id
    })
})

blogRouter.put('/', async (c) => {
    const prisma = c.get('prisma');
    const userId = c.get('userId');

    const body = await c.req.json();
    // zod validation
    const parsedInput = updatePost.safeParse(body);
    if (!parsedInput.success) {
        return c.json({
            msg: "invalid inputs",
            error: parsedInput.error
        }, 411);
    }
    try {
        // passing title/content to data object depending on user res
        var data = {
            ...('title' in body && { title: body.title }),
            ...('content' in body && { content: body.content }),
        }
        console.log(data)

        const res = await prisma.post.update({
            where: {
                id: body.postId
            },
            data: data
        })
        console.log(res);
        return c.json({
            msg: "updated post",
            blogId: res.id
        });
    }
    catch (e) {
        console.log(e);
        return c.json({
            msg: "post not found"
        }, 404);
    }
})

// TODO: implement pagination  
// returns first 10 blogs, instead of all blogs
// then as scroll down, next 10 etc.
blogRouter.get('/bulk', async (c) => {
    const prisma = c.get('prisma');
    const userId = c.get('userId');
    console.log("hi there")
    console.log(userId);

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    })

    return c.json({
        msg: "fetched all posts",
        posts: posts
    })

})

blogRouter.get('/:id', async (c) => {
    const prisma = c.get('prisma');
    const userId = c.get('userId');
    const postId = c.req.param('id');
    console.log(postId);

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    if (!post) {
        return c.json({
            msg: "no post exists"
        })
    }

    console.log(post)
    return c.json({
        msg: "fetched post",
        post: post
    })
})

