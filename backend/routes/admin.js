const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")

const adminController = require("../controllers/adminController");
const productsController=require("../controllers/productsController")

router.post("/register", adminController.createAdmin);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);

router.post("/addproducts", authorize,productsController.addProducts);
router.get("/getAllproducts",authorize, productsController.getProducts);
router.get("/getOneproducts",authorize, productsController.getOneProduct);
router.put("/updateproducts",authorize, productsController.updateProducts);
router.delete("/deleteproducts",authorize, productsController.deleteProduct);

router.post("/deleteuser",authorize, adminController.deleteUser)
router.post("/updatepassword", authorize,adminController.updatePassword )



function authorize(req,res,next){
    try{
       let reqheader = req.headers['authorization']
       const token = reqheader.replace("Bearer ",'')
       
 
   
       const verifiedtoken = jwt.verify(token,'jamesbond')
       req.token = verifiedtoken
       next()
       return
    }
    catch(err){
       res.send("you are not authorized")
    }
   }




module.exports = router;