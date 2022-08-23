const WishList = require("../models/wishListModel");

const addToWishList = async (req, res) => {
  if (!req.body.email || !req.body.category || !req.body.image || !req.body.name || !req.body.price || !req.body.description) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  
  const checkItem = await WishList.findOne({ name: req.body.name ,email:req.body.email});
  if (checkItem) {
    return res.json({ msg: "product already exists", status: false });
  }

  const newWishList = new WishList(req.body);
  try {
    const savedWishList = await newWishList.save();
    res.status(200).json(savedWishList);
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateWishList = async (req, res) => {

  if(!req.body.name || !req.body.email)req.body=JSON.parse(req.headers['data'])
  
  if (!req.body.email || !req.body.name ) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  
  if (!req.body.email || !req.body.category || !req.body.image || !req.body.name || !req.body.price || !req.body.description) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  try {
    const updatedWishList = await WishList.findOneAndUpdate(
      req.body.name,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWishList);
  } catch (err) {
    res.status(500).json({"msg":"product in WishList not found"});
  }
}

const deleteFromWishList = async (req, res) => {

  
  if(!req.body.name || !req.body.email)req.body=JSON.parse(req.headers['data'])
  
  if (!req.body.email || !req.body.name ) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  try {
    await WishList.findOneAndDelete({"email":req.body.email,"name":req.body.name});
    res.status(200).json("WishList item has been deleted...");
  } catch (err) {
    res.status(500).json({"msg":"product in WishList not found"});
  }
}

const getUserWishList = async (req, res) => {
  if (!req.body.email  ) {
    return res.json({ msg: "missing required fields in body", status: false });
  }
  try {
    
    const WishLists = await WishList.find();
    res.status(200).json(WishLists);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllUsersWishList = async (req, res) => {
  try {
    const WishLists = await WishList.find();
    res.status(200).json(WishLists);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { addToWishList, updateWishList, deleteFromWishList, getUserWishList, getAllUsersWishList }