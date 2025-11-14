import {z} from 'zod'
export const MessageSchema=z.object({
    content:z
    .string()
    .min(10,{message:'must be 6 char'})
    .max(300,{message:'content must not be longer than 300 char'})
})