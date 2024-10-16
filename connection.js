const mongoose=require("mongoose");

async function mongooDbConnect(dataBase_url){
    try{
        await mongoose.connect(dataBase_url);
        console.log("database connected successfully . ");
    }catch(error){
        console.log(`there is some error while connecting database ${error}`);
    }
}

module.exports= mongooDbConnect;