module.exports.authorize=function (req,res,next){
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

