const express=require("express");
const url=express.Router();

const {generateShortUrl,redirectToOrignalUrl}=require("../controllers/url");
const {authentic,authorizaton}= require("../middleware/auth");

url.post("/generateUrl",authentic,authorizaton,generateShortUrl);
url.get("/redirect/:shortUrl",redirectToOrignalUrl);
url.get("/",authentic,(req,res)=>{
    res.render("home");//rendering home
});

module.exports=url;