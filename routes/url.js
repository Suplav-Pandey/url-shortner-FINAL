const express=require("express");
const url=express.Router();

const {generateShortUrl,redirectToOrignalUrl}=require("../controllers/url");

url.post("/generateUrl",generateShortUrl);
url.get("/redirect/:shortUrl",redirectToOrignalUrl);

module.exports=url;