const express = require("express")
const server = express()
const bp=require("body-parser")
server.use(bp.json())
const authentication=require("../week11p/routes/AuthenticationRoutes")
const verifiedtoken = require("./routes/ProtectedRoutes")
const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Authentication").then((res)=>console.log("connected to db")).catch((err)=>console.log(err))

//mongoose.connect("mongodb://localhost:27017/Login status DB").then((res)=>console.log("connected to db")).catch((err)=>console.log(err))


server.use("/",authentication)
server.use("/",verifiedtoken)


server.listen(3001,()=>console.log("server started"))