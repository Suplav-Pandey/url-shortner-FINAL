const express=require("express");
const url=express.Router();

const {generateShortUrl,redirectToOrignalUrl}=require("../controllers/url");

url.post("/generateUrl",generateShortUrl);
url.get("/redirect/:shortUrl",redirectToOrignalUrl);
url.get("/",(req,res)=>{
    res.render("home");//rendering home
});

module.exports=url;