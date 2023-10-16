const express = require("express");
const { upload } = require("../middlewares/imageMulter");
const {
  addProduct,
  getAllProducts,
} = require("../controllers/productController");
const router = express.Router();

router.post("/addproduct", upload.single("images"), addProduct);
router.get("/getallproducts", getAllProducts);
module.exports = router;
