import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String, //Cloudinary Url
        required:true
    }
},{timestamps:true})

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
})

export const User = mongoose.model("User",userSchema)


