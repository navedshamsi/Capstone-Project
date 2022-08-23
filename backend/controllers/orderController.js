const Order = require("../models/orderModel");


module.exports.addOrder= async function (req, res) {
    if(!req.body.category || !req.body.image || !req.body.name|| !req.body.price|| !req.body.description){
        return res.json({ msg: "missing required fields in body", status: false });
    }

   const checkItem = await Order.findOne({ name: req.body.name });
   if(checkItem){
    return res.json({ msg: "product already exists", status: false });
   }

    let items= req.body
    try{
        await Order.create(items);
        return res.json({ msg: "Added", status: true });
    }
    catch(e){
        return res.json({ msg:"body not according to required parameters", status: false });
    }
    
};

module.exports.updateOrder = async function (req, res) {
   
    if(!req.body.category || !req.body.image || !req.body.name|| !req.body.price|| !req.body.description){
        return res.json({ msg: "missing required fields in body", status: false });
    }

    const checkProduct = await Order.findOneAndUpdate({ name: req.body.name },
        req.body);

    if (checkProduct) {
        return res.json({ msg: "updated", status: true });
    }
    else res.json({ msg: "product not found", status: false });
};

module.exports.deleteOrder = async function (req, res) {
    if( !req.body.name){
        return res.json({ msg: "missing name in req body", status: false });
    }

    try {
        const product = await Order.findOneAndDelete({ name: req.body.name });
        if (product) {
            res.send("deletion of product successfull");
        } else {
            res.send("Invalid product name || product not found");
        }
    } catch {
        res.send("error in deleting User");
    }

};



module.exports.getOrder= async function (req, res) {
    

   const checkItem = await Order.find();
   if(!checkItem){
    return res.json({ msg: "no Order found", status: false });
   }
   else
    return res.json({ data:checkItem, status: true });
    
    
};

module.exports.getOneOrder= async function (req, res) {
    
    if(!req.body.name){
        return res.json({ msg: "missing required fields in body", status: false });
    }
    const checkItem = await Order.find({name:req.body.name});
    if(!checkItem){
     return res.json({ msg: "no order found", status: false });
    }
    else
     return res.json({ data:checkItem, status: true });
     
     
 };
 