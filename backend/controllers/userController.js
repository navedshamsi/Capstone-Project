const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.updatePassword= async (req,res)=>{
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
}


module.exports.deleteUser=async (req,res)=>{
    //const data = req.body
    try{

    const deleteuser = await User.findOneAndDelete({email:req.body.email})

    if(deleteuser){
    res.status(301).send({msg:`deleted ${req.body.email}`,status: true})
    }
    else{
        res.status(404).send({msg:"not deleted",status: false})
    }
    }
    catch(err){
        res.send("deletion failed")
    }
}



module.exports.register= async (req,res)=>{
    try{
    const data = req.body
    const user = await User.findOne({email:data.email})
    if(user){
        res.status(404).send({msg:"user credentials already taken, enter new mail id",status:false})
    }
    else{
    const userhashedpassword = await bcrypt.hash(data.password,4)
  
        User.create({
            email:data.email,
            password:userhashedpassword,
            name:data.name
        })
        res.status(201).send("user signup succesfull")
    }
}
    catch(err){
        res.status(404).send(err)
    
}}


module.exports.login=async (req,res)=>{
    const data = req.body
    try{
    const user = await User.findOne({email:data.email})
    if(user){
    //console.log(user)
    const usercomparsion = await bcrypt.compare(data.password,user.password)
    //console.log(usercomparsion)
    if(usercomparsion){
      
        res.status(201).send({msg:"user signin succesfull",status:true})
        
    }
    else{
        res.status(404).send({msg:"incorrect user credentials",status:false})
    }
}
else{
    res.status(404).send({msg:"user details not found, please signup",status:false})
}

}
    catch(err){
        res.status(404).send(err)
    }
}


module.exports.logout=(req,res)=>{
    res.send("logout successful")
}


module.exports.get= async (req,res)=>{

    const data = req.body
    const user = await User.findOne({email:data.email})
    if(!user){
        res.status(404).send({msg:"user not found",status:false})
    }
    else{
        
        res.status(201).send({data:user,status:true})
    }
}
