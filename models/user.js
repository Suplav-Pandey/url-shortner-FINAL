const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"NORMAL" //BUT IF WE MAKE IT "ADMIN" THEN IT WILL AUTOMATICALLY SHOW ALL URLS.
    }
},{timestamps:true});

const USER=mongoose.model("UESR",userSchema);

module.exports=USER;