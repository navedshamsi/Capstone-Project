const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

mongoose.connect("mongodb://localhost:27017/capstone");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("errror in creating db", err);
});
db.once("open", () => {
  console.log("Succesfully connected to the database");
});





app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cartRoute"));
app.use("/orders", require("./routes/orderRoute"));
app.use("/wishlist", require("./routes/wishListRoute"));
app.use("/discount", require("./routes/discountCouponRoute"));






app.listen(8000, () => {
  console.log("Server is running on port:8000");
});
