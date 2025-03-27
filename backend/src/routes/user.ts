import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@kartik26/mediumzod'
import { parse } from 'hono/utils/cookie'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
        prisma: any
    }
}>();

// routes
userRouter.post('/signup', async (c) => {
    // needs to be defined inside to access DATABASE_URL env
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL
    // }).$extends(withAccelerate());
    const prisma = c.get('prisma');

    const body = await c.req.json();
    // zod validation
    const parsedInput = signupInput.safeParse(body)
    if (!parsedInput.success) {
        return c.json({
            msg: "Invalid inputs",
            error: parsedInput.error
        }, 411)
    }

    console.log(body);
    console.log(c.env.DATABASE_URL)
    try {
        const userExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (userExist) {
            return c.json({
                msg: "User exists"
            }, 403);
        }

        // add user if does not exist
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name ? body.name : null // as optional field
            }
        })

        // generate jwt token
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        console.log(jwt);

        console.log(user);
        return c.json({
            msg: "added user",
            jwt: jwt
        });
    }
    catch (e) {
        console.log(`Error occured ${e}`);
        return c.json({
            msg: "Invalid inputs"
        }, 403);
    }
})

userRouter.post('/signin', async (c) => {
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL
    // }).$extends(withAccelerate());
    const prisma = c.get('prisma');

    const body = await c.req.json();
    // zod validation
    const parsedInput = signinInput.safeParse(body)
    if (!parsedInput.success) {
        return c.json({
            msg: "Invalid inputs",
            error: parsedInput.error
        }, 411)
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    // check if user exists
    if (!user) {
        return c.json({
            msg: "User does not exist/Invalid credentials"
        })
    }

    // login success - return jwt
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        msg: "login successful",
        jwt: jwt
    })

})