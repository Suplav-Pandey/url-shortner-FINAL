//express wala part
const express=require("express");
const app=express();
const PORT=3000;

//mongo connnect
const mongooDbConnect=require("./connection");
mongooDbConnect("mongodb://127.0.0.1:27017/THE-URL-SHORTNER");

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

const url=require("./routes/url");
const user=require("./routes/user");
const cookieParser=require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",url);
app.use("/user",user);

app.listen(PORT,console.log(`the server started at port ${PORT}.`));