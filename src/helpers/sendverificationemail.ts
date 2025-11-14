import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationemail";
import { apiresponse } from "@/types/apiresponse";
export async function sendverificationemail(
    email:string,
    username:string,
    verifycode:string,

) :Promise<apiresponse>{
    try{
        return{success:true,message:'fa to send verification email'}
    }catch(emailerror){
        console.error("error sending verification email",emailerror)
        return{success:false,message:'failed to send verification email'}
    }
}