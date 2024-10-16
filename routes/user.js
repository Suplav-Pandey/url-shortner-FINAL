const express=require("express");
const user=express.Router();

const {register,login}=require("../controllers/user");

user.post("/register",register);
user.get("/login",login);

module.exports=user;