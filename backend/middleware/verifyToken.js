const jwt = require("jsonwebtoken");
// process.env.JWT_SEC
const verifyToken = (req, res, next) => {
  try{

    let reqheader = req.headers['authorization']
    const token = reqheader.replace("Bearer ",'')
    const verifiedtoken = jwt.verify(token,'secret')
    req.token = verifiedtoken
    next()
    return
 }
 catch(err){
    res.send("you are not authorized")
 }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};