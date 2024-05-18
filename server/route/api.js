const express=require("express");
const { signUp, login } = require("../controller/home");


const auth=require("../middleware/auth");
const buyer=require("./buyer");
const seller=require("./seller");
const property=require("./property")

const api=express.Router();

api.post("/sign",signUp);
api.post("/login",login);


api.use("/buyer",auth,buyer);
api.use("/seller",auth,seller);
api.use("/property",auth,property);


module.exports=api;