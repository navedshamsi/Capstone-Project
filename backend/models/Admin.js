const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailId:{
     type:String,
     required: true,
  }
});

const Admin = mongoose.model("Admin", AdminSchema);


module.exports = Admin;