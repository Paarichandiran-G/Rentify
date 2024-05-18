const express=require("express")


require("./db/connect")

const app=express()
port=process.env.PORT || 8080


app.get("/health_check",(req,res)=>{
    res.status(200);
    res.json({message:"server is running fine",success:true})
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})