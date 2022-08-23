const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  
  if (!req.body.email || !req.body.category || !req.body.image || !req.body.name || !req.body.price || !req.body.description) {
    return res.json({ msg: "missing required fields in body", status: false });
  }

  const checkItem = await Cart.findOne({ name: req.body.name ,email:req.body.email});
  if (checkItem) {
    return res.json({ msg: "product already exists", status: false });
  }

  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateCart = async (req, res) => {

  if(!req.body.name || !req.body.email)req.body=JSON.parse(req.headers['data'])
  
  if (!req.body.email || !req.body.name ) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  
  if (!req.body.email || !req.body.category || !req.body.image || !req.body.name || !req.body.price || !req.body.description) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      req.body.name,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({"msg":"product in cart not found"});
  }
}

const deleteFromCart = async (req, res) => {

  
  if(!req.name || !req.body.email)req.body=JSON.parse(req.headers['data'])
  
  if (!req.body.email || !req.body.name ) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  try {
    await Cart.findOneAndDelete({"email":req.body.email,"name":req.body.name});
    res.status(200).json("Cart item has been deleted...");
  } catch (err) {
    res.status(500).json({"msg":"product in cart not found"});
  }
}

const getUserCart = async (req, res) => {
  if (!req.body.email  ) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  try {
    const cart = await Cart.find({ email: req.body.email });
    
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllUsersCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { addToCart, updateCart, deleteFromCart, getUserCart, getAllUsersCart }