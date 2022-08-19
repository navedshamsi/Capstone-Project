const { csv2json } =require("csvjson-csv2json");
const Products =require ("../models/Products.js");
const bulkUpload = async (req, res) => {
  try {
    if (!req.files || !req.files?.csvupload) throw Error("Invalid file");
    const json = csv2json(req.files.csvupload.data.toString("utf-8"));
    await Products.insertMany(json);
    return res.status(200).json({ message: "ok", data: json });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err?.message ?? "An error occurred" });
  }
};
module.export=bulkUpload ;
