const mongoose=require("mongoose");
const USER=require("./user");

const urlSchema=mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    orignalUrl:{
        type:String,
        required:true
    },
    createdBy:{
        type: String,
        required:true
    },
    clicks:{
        type:Number,
        default:0
    }
},{timestamps:true});

const URL=mongoose.model("URL",urlSchema);

module.exports=URL;