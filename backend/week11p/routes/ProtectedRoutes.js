const express = require("express")
const bcrypt = require("bcrypt")
const usermodel = require("../models/usermodel")
const adminmodel = require("../models/adminmodel")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/admin/updatepassword", authorize, async (req,res)=>{
    const data = req.body
   // console.log(req.headers['authorization'])  -- bearer token
    try{
    const hashedpassword = await bcrypt.hash(data.upassword,4)
    const updatedpassword = await usermodel.findOneAndUpdate({email:req.token.email},{password: hashedpassword})
    if(updatedpassword){
    res.status(301).send({msg:"password updated",status: true})
    }
    else{
        res.status(404).send({msg:"password not updated",status: false})
    }
    }
    catch(err){
        res.send("not authorized")
    }
})

router.post("/admin/deleteuser",authorize, async (req,res)=>{
    //const data = req.body
    try{
    const deleteuser = await usermodel.findOneAndDelete({email:req.token.email})
    console.log(deleteuser)
    if(deleteuser){
    res.status(301).send({msg:`deleted ${data.email}`,status: true})
    }
    else{
        res.status(404).send({msg:"not deleted",status: false})
    }
    }
    catch(err){
        res.send("deletion failed")
    }
})








function authorize(req,res,next){
 try{
    let reqheader = req.headers['authorization']
    const token = reqheader.replace("Bearer ",'')
    //console.log(token)
    const verifiedtoken = jwt.verify(token,'jamesbond')
    req.token = verifiedtoken
    next()
    return
 }
 catch(err){
    res.send("you are not authorized")
 }
}


module.exports  = router