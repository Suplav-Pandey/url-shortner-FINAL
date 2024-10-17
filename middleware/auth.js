//here we have done authentication and authorization

const { getUser } = require("../services/authentication");
const USER=require("../models/user");//very inefficient as we are doing several database query which increase the cost on server as well as poor time .
const URL=require("../models/url");

function authentic(req,res,next){
    const uid=req.cookies?.uid;
    if(!uid){
        const message="no session id found .please login";
        return res.status(400).render("login",{message}); 
    }
    const userEmail=getUser(uid);
    if(!userEmail){
        const message="no user found . please login again ";
        return res.status(400).render("login",{message});
    }    
    req.userEmail=userEmail;
    next();
}

async function authorizaton(req,res,next){
    const email=req.userEmail;
    const user=await USER.findOne({email});
    const role=user.role;
    let urlByRole=null;
    if(role && role=="ADMIN"){
        urlByRole=await URL.find({});
    }else{
        urlByRole=await URL.find({createdBy : email});
    }
    req.urlByRole = urlByRole;
    next();
}

module.exports={authentic,authorizaton};