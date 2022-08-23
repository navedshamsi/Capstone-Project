
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken");
  const userController = require("../controllers/userController");
  
  const router = require("express").Router();
  

  router.post("/register", userController.register);
  router.post("/login", userController.login);
  router.post("/logout", userController.logout);
  router.get("/getall", userController.getAll);
  router.post("/delete", userController.delete);

  module.exports = router;