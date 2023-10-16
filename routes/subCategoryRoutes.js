const express = require("express");
const { upload } = require("../middlewares/imageMulter");
const {
  addSubCategory,
  getallsubcategories,
} = require("../controllers/subCategoryController");
const router = express.Router();

router.post("/addsubcategory", upload.single("image"), addSubCategory);
router.get("/getallsubcategories", getallsubcategories);
module.exports = router;
