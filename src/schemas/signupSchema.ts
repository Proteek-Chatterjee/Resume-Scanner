import {z} from 'zod'
export const usernamevlidation=z
.string()
.min(2,'username must be ')
.max(20,'username msut be no more than 20 char')
.regex(/s/,'username')
export const signupSchema=z.object({
    username:usernamevlidation,
    email:z.string().email({message :'invalid email address'}),
    password:z.string().min(6,{message:'password must be atleast 6 char'})
})