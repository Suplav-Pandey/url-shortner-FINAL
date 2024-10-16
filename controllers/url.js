const URL=require("../models/url");
const crypto=require("crypto");
const { getUser } = require("../services/auth");

async function generateShortUrl(req,res){
    try{
        const uid=req.cookies?.uid;
        if(!uid){
            return res.status(400).send("no session id found .please login"); 
        }
        const userEmail=getUser(uid);
        if(!userEmail){
            return res.status(400).send("no user found .please login");
        }

        const orignalUrl=req.body.orignalUrl;
        if(!orignalUrl){
            return res.status(400).send("the orignalUrl is required .")
        }
        const createdBy= userEmail;
        const shortUrl=crypto.randomBytes(4).toString("Hex");//doubt
        const clicks=0;

        await URL.create({
            shortUrl,
            orignalUrl,
            createdBy,
            clicks
        });

        return res.status(201).send(`the short url generated is ${shortUrl}`);
    }catch(error){
        console.log(`error while generating short url . ${error}`);
        return res.status(500).send(`error while generating short url . ${error}`);
    }
}

async function redirectToOrignalUrl(req,res){
    try{
        shortUrl=req.params.shortUrl;
        if(!shortUrl){
            return res.status(400).send("short url is required .");
        }
        const wholeUrl=await URL.findOneAndUpdate({shortUrl},
            {$inc : {clicks : 1}},
            {new :true}
        );
        orignalUrl=wholeUrl.orignalUrl;
        return res.status(200).redirect(orignalUrl);
    }catch(error){
        console.log(`error while redirecting the url ${error}`);
        return res.status(500).send(`error while redirecting the url ${error}`);
    }
}

module.exports={generateShortUrl,redirectToOrignalUrl}