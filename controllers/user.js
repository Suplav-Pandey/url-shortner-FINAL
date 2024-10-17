const USER=require("../models/user");
const { setUser } = require("../services/authentication");

async function register(req,res){
    try{
        const {name, email , password}= req.body;
        if(!name || !email || !password){
            // return res.status(400).send("either name or email or password is not there .");
            return res.status(400).render("register",{email});
        }
        await USER.create({ name, email , password });
        // return res.status(201).send(`the user ${name} is successfully registered .`);
        return res.status(201).render("login",{name});
    }catch(error){
        console.log(`error while registering the user. ${error}`);
        return res.status(500).send(`error while registering the user. ${error}`);
    }
}

async function login(req,res){
    try{
        const {email , password}= req.query;
        if(!email || !password){
            // return res.status(400).send("either email or password is not there .");
            return res.status(400).render("login",{email});
        }
        const user=USER.findOne(email ,password);//little bit inefficient as we have to search in database 2 times .optimize it.
        if(!user){
            // return res.status(400).send("either email or password is incorrect.");
            return res.status(400).render("login",{email});
        }
        const uid=setUser(email,password);
        // return res.status(201).cookie("uid",uid).send(`user successfully logined .`);
        return res.status(201).cookie("uid",uid).render("home");
    }catch(error){
        console.log(`error while logining. ${error}`);
        return res.status(500).send(`error while logining. ${error}`);
    }
}

module.exports={register,login};