import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date;
}
const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isverifed:boolean;
    isAcceptingMessage:boolean;
    messages:Message[]
}
const userSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"USername si required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'please type a valid email']
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify code expiry is required"],
    },
    isverifed:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})
const UserModel=(mongoose.models.user as mongoose.Model<User>)||mongoose.model<User>("user",userSchema)
export default UserModel;