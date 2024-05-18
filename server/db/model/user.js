const mongoose=require("mongoose");
const {isMobilePhone } = require("validator");

const userSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        default:""
    },
    phone_no:{
        type:String,
        required:true,
        trim:true,
        validate:[isMobilePhone,"invalid mobile number"]
    },
    property:[{
        type:mongoose.Schema.ObjectId,
        required:true
    }]
})

const user=mongoose.model("user",userSchema,"user")

module.exports=user;