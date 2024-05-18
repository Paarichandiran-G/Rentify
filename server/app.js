require("dotenv").config()
const path=require("path");
const express=require("express")
const cookieParser=require("cookie-parser")



require("./db/connect")
const api=require("./route/api")


const app=express()
const port=process.env.PORT || 8080


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());



app.use(express.static(path.join(__dirname,"build")))


// api
app.use("/api",api);

app.get("/health_check",(req,res)=>{
    res.status(200);
    res.json({message:"server is running fine",success:true})
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})