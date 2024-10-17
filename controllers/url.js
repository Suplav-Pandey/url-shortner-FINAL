const URL=require("../models/url");
const crypto=require("crypto");

async function generateShortUrl(req,res){
    try{
        const userEmail=req.userEmail;
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
        
        const URl=req.urlByRole;

        return res.status(201).render("home",{shortUrl,URl});
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