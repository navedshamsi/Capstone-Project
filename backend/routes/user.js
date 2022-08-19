const express = require("express")
const jwt = require("jsonwebtoken")

const userController=require("../controllers/userController")

const router = express.Router()

// router.post("/admin/updatepassword", authorize,userController.updatePassword )

router.post("/deleteuser",authorize, userController.deleteUser)
router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/logout",userController.logout)
router.post("/get",userController.get)


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