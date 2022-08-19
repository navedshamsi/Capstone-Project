const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const adminmodel = require("../models/adminmodel")
//const statusmodel = require("../models/statusmodel")
const jwt = require("jsonwebtoken")

const router = express.Router()

// USER 
  //signup

router.post("/user/register",async (req,res)=>{
    
    try{
    const data = req.body
    const user = await User.findOne({email:data.email})
    if(user){
        res.status(404).send({msg:"user credentials already taken, enter new mail id",status:false})
    }
    else{
    const userhashedpassword = await bcrypt.hash(data.password,4)
  
        const result = User.create({
            email:data.email,
            password:userhashedpassword
        })
        res.status(201).send("user signup succesfull")
    }
}
    catch(err){
        res.status(404).send(err)
    
}})

 //signin

router.post("/user/login",async (req,res)=>{
    const data = req.body
    try{
    const user = await User.findOne({email:data.email})
    if(user){
    //console.log(user)
    const usercomparsion = await bcrypt.compare(data.password,user.password)
    //console.log(usercomparsion)
    if(usercomparsion){
        const generatedtoken = jwt.sign({email:data.email},"jamesbond",{expiresIn:'1h'})
        console.log(generatedtoken)
        res.status(201).send({msg:"user signin succesfull",status:true,token:generatedtoken})
        
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
})

 ///logout

router.post("/user/logout",(req,res)=>{
    res.send("logout successful")
})









//ADMIN 
router.post("/admin/register",async (req,res)=>{
    
    try{
    const data = req.body
    const admin = await adminmodel.findOne({email:data.email})
    if(admin){
        res.status(404).send({msg:"admin credentials already taken, enter new mail id",status:false})
    }
    else{
    const adminhashedpassword = await bcrypt.hash(data.password,4)
  
        const result = adminmodel.create({
            email:data.email,
            password:adminhashedpassword
        })
        res.status(201).send("admin signup succesfull")
    }
}
    catch(err){
        res.status(404).send(err)
    
}})

router.post("/admin/login",async (req,res)=>{
    const data = req.body
    try{
    const admin = await adminmodel.findOne({email:data.email})
    if(admin){
    //console.log(admin)
    const admincomparsion = await bcrypt.compare(data.password,admin.password)
    //console.log(admincomparsion)
    if(admincomparsion){
        res.status(201).send({msg:"admin signin succesfull",status:true})
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
})

module.exports = router



/// ADMIN CRUD

//create
router.post("/admin/createuser",async (req,res)=>{
    
    try{
    const data = req.body
    const user = await User.findOne({email:data.email})
    if(user){
        res.status(404).send({msg:"user credentials already taken, enter new mail id",status:false})
    }
    else{
    const userhashedpassword = await bcrypt.hash(data.password,4)
  
        const result = User.create({
            email:data.email,
            password:userhashedpassword
        })
        res.status(201).send("user signup succesfull")
    }
}
    catch(err){
        res.status(404).send(err)
    
}})



//udpate
/*router.put("/admin/update",async (req,res)=>{
    const data = req.body
    console.log(ud)
    const search = await User.findOne({data.email})
    if(search){
    try{
    const result = await todoModel.updateOne({email:ud.email},{completion:"true"})
    res.send(result)
    }
    catch(err){
        res.send(err)
    }
}
})   */ 
module.exports = router