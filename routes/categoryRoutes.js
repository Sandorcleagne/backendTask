const express = require("express");
const { upload } = require("../middlewares/imageMulter");
const {
  addCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/addcategory", upload.single("image"), addCategory);
router.get("/getallcategories", getAllCategories);
module.exports = router;
