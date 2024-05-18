const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const { MongoServerError }=require("mongodb");

const loginModel=require("../db/model/login");
const userModel=require("../db/model/user");


const signUp=async(req,res)=>{
    let user
    try{
        user=await (new userModel({
            first_name:req.body.first_name,
            last_name:req.body.last_name || "",
            phone_no:req.body.phone_no
        })).save();
        let login=new loginModel({
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
            user:user._id
        })
        await login.save();
        res.status(200);
        res.json({message:"signup successfull",success:true});
    }
    catch(err){
        if(user){
            await userModel.deleteOne({_id:user._id});
        }
        if(err instanceof mongoose.Error.ValidationError || err instanceof MongoServerError){
            res.status(400);
            res.json({message:err.message,success:false})
        }
        else{
            res.status(500);
            res.json({message:err.message,success:false})
        }
    }
}

const login=async(req,res)=>{
    try{
        let login=await loginModel.findOne({email:req.body.email});
        if(!login){
            res.status(403);
            res.json({message:"account doesn't exist",success:true})
            return;
        }
        if(await bcrypt.compare(req.body.password,login.password)){
            let token=jwt.sign({email:login.email,userId:login.user,role:login.role},process.env.SECRET_KEY);
            res.cookie("sessionId",token);
            res.status(200);
            res.json({message:"login success",success:true});
            return;
        }
        res.status(401);
        res.json({message:"Invalid password",success:true})
    }
    catch(err){
        res.status(500);
        res.json({message:err.message,success:false});
    }
}

module.exports={signUp,login}