const Products = require("../models/Products");

module.exports.addProducts= async function (req, res) {
    if(!req.body.category || !req.body.image || !req.body.name|| !req.body.price|| !req.body.description){
        return res.json({ msg: "missing required fields in body", status: false });
    }

   const checkItem = await Products.findOne({ name: req.body.name });
   if(checkItem){
    return res.json({ msg: "product already exists", status: false });
   }

    let items= req.body
    try{
        await Products.create(items);
        return res.json({ msg: "Added", status: true });
    }
    catch(e){
        return res.json({ msg:"body not according to required parameters", status: false });
    }
    
};

module.exports.updateProducts = async function (req, res) {
   
    if(!req.body.category || !req.body.image || !req.body.name|| !req.body.price|| !req.body.description){
        return res.json({ msg: "missing required fields in body", status: false });
    }

    const checkProduct = await Products.findOneAndUpdate({ name: req.body.name },
        req.body);

    if (checkProduct) {
        return res.json({ msg: "updated", status: true });
    }
    else res.json({ msg: "product not found", status: false });
};

module.exports.deleteProduct = async function (req, res) {
    if( !req.body.name){
        return res.json({ msg: "missing name in req body", status: false });
    }

    try {
        const product = await Products.findOneAndDelete({ name: req.body.name });
        if (product) {
            res.send("deletion of product successfull");
        } else {
            res.send("Invalid product name || product not found");
        }
    } catch {
        res.send("error in deleting books");
    }

};



module.exports.getProducts= async function (req, res) {
    

   const checkItem = await Products.find();
   if(!checkItem){
    return res.json({ msg: "no products found", status: false });
   }
   else
    return res.json({ data:checkItem, status: true });
    
    
};

module.exports.getOneProduct= async function (req, res) {
    
    if(!req.body.name){
        return res.json({ msg: "missing required fields in body", status: false });
    }
    const checkItem = await Products.find({name:req.body.name});
    if(!checkItem){
     return res.json({ msg: "no product found", status: false });
    }
    else
     return res.json({ data:checkItem, status: true });
     
     
 };
 