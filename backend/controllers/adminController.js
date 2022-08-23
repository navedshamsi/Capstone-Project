const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.updatePassword= async (req,res)=>{
    const data = req.body
    try{    
    const hashedpassword = await bcrypt.hash(data.password,4)
    
    const updatedpassword = await User.findOneAndUpdate({email:req.body.email},{password: hashedpassword})
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

module.exports.createAdmin = async function (req, res) {
   
    try{
        const data = req.body
        const admin = await Admin.findOne({email:data.email})
        
        if(admin){
            res.status(404).send({msg:"admin credentials already taken, enter new mail id",status:false})
            
        }
        else{
            
        const adminhashedpassword = await bcrypt.hash(data.password,4)
        const result = Admin.create({
                email:data.email,
                password:adminhashedpassword,
                name:data.name
            })
        //  console.log(result)
            res.status(201).send("admin signup succesfull")
        }
    }
        catch(err){
            res.status(404).send(err)
        
}}

module.exports.login = async (req,res)=>{
    const data = req.body
    try{
    const admin = await Admin.findOne({email:data.email})

    if(admin){
    
    const admincomparsion = await bcrypt.compare(data.password,admin.password)
    
    if(admincomparsion){
        const generatedtoken = jwt.sign({email:data.email},"secret",{expiresIn:'1h'})
        res.status(201).send({msg:"admin signin succesfull",status:true
        ,token:generatedtoken})
        }
        else{
            res.status(404).send({msg:"incorrect admin credentials",status:false})
        }
    }
    else{
        res.status(404).send({msg:"admin details not found, please signup",status:false})
    }
}
    catch(err){
        res.status(404).send(err)
    }
}



module.exports.logout=(req,res)=>{
    res.send("logout successful")
}
