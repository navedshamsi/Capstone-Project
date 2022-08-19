const Admin = require("../models/Admin");
const User = require("../models/User");



module.exports.createAdmin = async function (req, res) {

    try{
        const data = req.body
        const admin = await Admin.findOne({email:data.email})
        if(admin){
            res.status(404).send({msg:"admin credentials already taken, enter new mail id",status:false})
        }
        else{
        const adminhashedpassword = await bcrypt.hash(data.password,4)
      
            const result = adminmodel.create({
                email:data.email,
                password:adminhashedpassword,
                name:data.name
            })
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
    //console.log(admin)
    const admincomparsion = await bcrypt.compare(data.password,admin.password)
    //console.log(admincomparsion)
    if(admincomparsion){
        const generatedtoken = jwt.sign({email:data.email},"jamesbond",{expiresIn:'1h'})
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
