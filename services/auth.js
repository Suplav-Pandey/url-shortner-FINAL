const jwt=require("jsonwebtoken");

const SECRET="HELLO MR SUPLAV PANDEY ."

function setUser(email,password){
    const payload={email,password};
    return jwt.sign(payload,SECRET);
}

function getUser(uid){
    try{
        const payload=jwt.verify(uid,SECRET);
        return payload.email;
    }catch(err){
        console.log(`Error: ${err.message}`);
        return null;
    }
}

module.exports={setUser,getUser};