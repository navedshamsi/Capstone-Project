const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");

router.post("/create", adminController.createAdmin);
router.get("/login", adminController.login);
router.get("/logout", adminController.logout);
// router.post("/create-user", userController.createUser);
// router.get("/get-user", adminController.getUser);
// router.put("/update-user", adminController.updateUser);
// router.delete("/delete-user", adminController.deleteUser);



// router.post("/create-books", booksController.createBooks);
// router.get("/get-books", booksController.getBooks);
// router.put("/update-books", booksController.updateBooks);
// router.delete("/delete-books", booksController.deleteBooks);



module.exports = router;