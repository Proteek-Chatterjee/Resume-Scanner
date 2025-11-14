import { Message } from "@/model/user";
export interface apiresponse{
    success:boolean;
    message:string;
    isAcceptingmessages?:boolean
    messages?:Array<Message>
}