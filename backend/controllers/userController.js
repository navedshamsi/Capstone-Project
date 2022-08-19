const User = require("../models/User")
const bcrypt = require("bcrypt")



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


module.exports.update= async (req,res)=>{

    
    const user = await User.findOneAndUpdate({email:req.body.email},req.body)
    if(!user){
        res.status(404).send({msg:"user not found",status:false})
    }
    else{
        
        res.status(201).send({data:"user updated",status:true})
    }
}

module.exports.deleteUser = async function (req, res) {
    if( !req.body.name){
        return res.json({ msg: "missing name in req body", status: false });
    }
   
    try {
        const user = await User.findOneAndDelete({ name: req.body.name });
        
        if (user) {
            res.send("deletion of User successfull");
        } else {
            res.send("Invalid User name || User not found");
        }
    } catch {
        res.send("error in deleting User");
    }

};