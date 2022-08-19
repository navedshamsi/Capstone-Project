const express = require("express")
const bcrypt = require("bcrypt")
const usermodel = require("../models/usermodel")
const adminmodel = require("../models/adminmodel")
const router = require("./AuthenticationRoutes")


router.post("/user/login",async (req,res)=>{
    const data = req.body
    const user = await usermodel.findOne({email:data.email})
    if(user){
    //console.log(user)
    const usercomparsion = await bcrypt.compare(data.password,user.password)
    //console.log(usercomparsion)
    if(usercomparsion){
        const result = statusmodel.create({ 
            email:data.email,
            password:userhashedpassword})
            
        res.status(201).send({msg:"user signin succesfull",status:true})
    
}}})

module.exports = router