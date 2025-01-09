import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        Unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"],

    },
    phone:{
        type:Number,
        required:true,
        Unique:true,
    },
    education:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["User","Admin"],
    },
    photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true

        },

    },
    password:{
        type:String,
        required:true,
        Unique:true,
        select:false,

    },
    token:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }


});

export const User = mongoose.model("User", userSchema);