const subCategoryModel = require("../models/subCategoryModel");

const addSubCategory = async (req, res) => {
  const { subCategoryName, categoryId } = req.body;
  try {
    if (subCategoryName && categoryId && req.file.originalname) {
      const doc = new subCategoryModel({
        subCategoryName: subCategoryName,
        categoryId: categoryId,
        image: req.file.originalname,
      });
      let savedData = await doc.save();
      if (savedData) {
        res.status(200).send({
          baseResponse: {
            status: 1,
            msg: "Sub Category Saved Successfully",
          },
        });
      } else {
        res.status(200).send({
          baseResponse: {
            status: 0,
            msg: "Something Went Wrong Unable To Save Sub Category !",
          },
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getallsubcategories = async (req, res) => {
  try {
    const subCategories = await subCategoryModel.findOne({ active: true });
    if (subCategories) {
      res.status(200).send({
        baseResponse: { status: 1, msg: "Sub Categories Found" },
        response: { categories: subCategories },
      });
    } else {
      return res.status(200).send({
        baseResponse: { status: 0, msg: "No Sub Categories Found" },
      });
    }
  } catch (error) {
    return res.status(200).send({
      baseResponse: { status: 0, msg: error.message },
    });
  }
};
module.exports = { addSubCategory, getallsubcategories };
