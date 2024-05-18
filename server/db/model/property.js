const mongoose=require("mongoose")

const propertySchema=mongoose.Schema({
    location:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    pincode:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        maxlength:6
    },
    address:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    no_of_bedroom:{
        type:Number,
        required:true
    },
    no_of_bathroom:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        enum:["work","house"]
    },
    near_by:[{
        tag:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        name:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        }
    }]
})

const property=mongoose.model("property",propertySchema,"property");

module.exports=property;