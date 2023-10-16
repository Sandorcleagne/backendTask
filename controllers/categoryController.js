const categoryModel = require("../models/categoryModel");

const addCategory = async (req, res) => {
  const { categoryName, description } = req.body;
  try {
    if (categoryName && description && req.file.originalname) {
      const categoryNameDb = await categoryModel.findOne({
        categoryName: categoryName,
      });
      console.log("categoryNameDb", categoryNameDb);
      if (categoryNameDb === null) {
        const doc = new categoryModel({
          categoryName: categoryName,
          description: description,
          image: req.file.originalname,
        });
        let savedData = await doc.save();
        console.log("savedData", savedData);
        if (savedData) {
          res.status(200).send({
            baseResponse: {
              status: 1,
              msg: "Category Saved Successfully",
            },
          });
        } else {
          res.status(200).send({
            baseResponse: {
              status: 0,
              msg: "Something Went Wrong Unable To Save Category !",
            },
          });
        }
      } else {
        res.status(200).send({
          baseResponse: {
            status: 0,
            msg: "Category With This Name Already Exist !",
          },
        });
      }
    } else {
      res.status(200).send({
        baseResponse: {
          status: 0,
          msg: "All Feilds Are Required !",
        },
      });
    }
  } catch (error) {
    res.status(200).send({
      baseResponse: {
        status: 0,
        msg: "Something Went Wrong Unable To Save Category !",
        error: error.message,
      },
    });
  }
};
const getAllCategories = async (req, res) => {
  const categories = await categoryModel.find({ active: true });
  try {
    if (categories) {
      res.status(200).send({
        baseResponse: { status: 1, msg: "Categories Found" },
        response: { categories: categories },
      });
    } else {
      return res.status(200).send({
        baseResponse: { status: 0, msg: "No Categories Found" },
      });
    }
  } catch (error) {
    return res.status(200).send({
      baseResponse: { status: 0, msg: error.message },
    });
  }
};
module.exports = { addCategory, getAllCategories };
