import { z } from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SigninInput = z.infer<typeof signinInput>;

export const createPost = z.object({
    title: z.string(),
    content: z.string()
})

export type CreatePost = z.infer<typeof createPost>;

export const updatePost = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
})

export type UpdatePost = z.infer<typeof updatePost>;