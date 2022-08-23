const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// module.exports.register= async (req,res)=>{
//     try{
//     const data = req.body
//     const user = await User.findOne({email:data.email})
//     if(user){
//         res.status(404).send({msg:"user credentials already taken, enter new mail id",status:false})
//     }
//     else{
//     const userhashedpassword = await bcrypt.hash(data.password,4)

//         User.create({
//             email:data.email,
//             password:userhashedpassword,
//             name:data.name
//         })
//         res.status(201).send("user signup succesfull")
//     }
// }
//     catch(err){
//         res.status(404).send(err)

// }}


// module.exports.login=async (req,res)=>{
//     const data = req.body
//     try{
//     const user = await User.findOne({email:data.email})
//     if(user){
//     //console.log(user)
//     const usercomparsion = await bcrypt.compare(data.password,user.password)
//     //console.log(usercomparsion)
//     if(usercomparsion){

//         res.status(201).send({msg:"user signin succesfull",status:true})

//     }
//     else{
//         res.status(404).send({msg:"incorrect user credentials",status:false})
//     }
// }
// else{
//     res.status(404).send({msg:"user details not found, please signup",status:false})
// }

// }
//     catch(err){
//         res.status(404).send(err)
//     }
// }


// module.exports.logout=(req,res)=>{
//     res.send("logout successful")
// }


// module.exports.get= async (req,res)=>{

//     const data = req.body
//     const user = await User.findOne({email:data.email})
//     if(!user){
//         res.status(404).send({msg:"user not found",status:false})
//     }
//     else{

//         res.status(201).send({data:user,status:true})
//     }
// }


// module.exports.update= async (req,res)=>{


//     const user = await User.findOneAndUpdate({email:req.body.email},req.body)
//     if(!user){
//         res.status(404).send({msg:"user not found",status:false})
//     }
//     else{

//         res.status(201).send({data:"user updated",status:true})
//     }
// }

// module.exports.deleteUser = async function (req, res) {
//     if( !req.body.name){
//         return res.json({ msg: "missing name in req body", status: false });
//     }

//     try {
//         const user = await User.findOneAndDelete({ name: req.body.name });

//         if (user) {
//             res.send("deletion of User successfull");
//         } else {
//             res.send("Invalid User name || User not found");
//         }
//     } catch {
//         res.send("error in deleting User");
//     }

// };



// const addUser = async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   if(user){
//     res.status(201).json("User already Exists with these details");
//   }
//   else{
//     const salt = await bcrypt.genSalt(10)
//     const { password, ...others } = req.body;
//     const newUser = new User({
//       password: await bcrypt.hash(req.body.password, salt),
//       ...others
//     });

//     try {
//       const savedUser = await newUser.save();
//       res.status(200).json(savedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// }

// const getAllUsers = async (req, res) => {
//     const query = req.query.new;
//     try {
//       const users = query
//         ? await User.find().sort({ _id: -1 }).limit(5)
//         : await User.find();
//       res.status(200).json(users);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

// const findUser = async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       const { password, ...others } = user._doc;
//       res.status(200).json(others);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

// const updateUser = async (req, res) => {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10)
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }

//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   const deleteUser = async (req, res) => {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("User has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   const userStats = async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try {
//       const data = await User.aggregate([
//         { $match: { createdAt: { $gte: lastYear } } },
//         {
//           $project: {
//             month: { $month: "$createdAt" },
//           },
//         },
//         {
//           $group: {
//             _id: "$month",
//             total: { $sum: 1 },
//           },
//         },
//       ]);
//       res.status(200).json(data)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

module.exports.register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(201).json("User already registered");
  }
  else {
    const salt = await bcrypt.genSalt(10)
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    };

    try {
      const savedUser = await User.create(newUser);
      
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports.login = async (req, res) => {
  let user;
  if (!req.body.email) {
    res.status(401).json("email not provided");
  } else {
    user = await User.findOne({ email: req.body.email });
  }

  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, sucess) {
      if (err) {
        res.status(500).json(err);
      } else if (!sucess) {
        res.status(401).json("Invalid Password!");
      } else {
        //Login sucess
        const generatedtoken = jwt.sign({ email: req.body.email }, "secret", { expiresIn: '1h' })
        res.status(201).send({
          msg: "admin signin succesfull", status: true
          , token: generatedtoken
        })
        // res.status(200).json({ ...others, accessToken });
      }
    })
  } else {
    res.status(401).json("User not found!");
  }
}

module.exports.logout = (req, res) => {
  try {
    req.headers.token = "";
    res.status(200).json("User logged out sucessfully");
  } catch (err) {
    res.status(500).json(err.message);
  }

}

module.exports.getAll= async(req, res) => {
  let users = await User.find();
  res.status(200).json(users);
}
module.exports.delete= async(req, res) => {
  let users = await User.findOneAndDelete({email:req.body.email});
  res.status(200).json(users);
}
  // , login, logout}
  //   // ,addUser, getAllUsers, findUser, updateUser, deleteUser, userStats }