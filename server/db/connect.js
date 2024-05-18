const mongoose=require("mongoose")

const mongo=process.env.MONGO_URL || "mongodb://localhost:27017/rentify"

mongoose.connect(mongo)
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(`Connection error: ${err}`)
})