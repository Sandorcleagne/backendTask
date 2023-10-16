const productModel = require("../models/productModel");
const addProduct = async (req, res) => {
  const { title, description, price, categoryId, subCategoryId } = req.body;
  try {
    if (
      title &&
      description &&
      price &&
      categoryId &&
      subCategoryId &&
      req.file.originalname
    ) {
      const productName = await productModel.findOne({ title: title });
      if (productName === null) {
        const doc = new productModel({
          title: title,
          description: description,
          price: price,
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          images: req.file.originalname,
        });
        let savedData = await doc.save();
        if (savedData) {
          res.status(200).send({
            baseResponse: {
              status: 1,
              msg: "Product Saved Successfully",
            },
          });
        } else {
          res.status(200).send({
            baseResponse: {
              status: 0,
              msg: "Something Went Wrong Unable To Save Product !",
            },
          });
        }
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
        msg: "Something Went Wrong Unable To Save Product !",
        error: error.message,
      },
    });
  }
};
const getAllProducts = async (req, res) => {
  const { categoryId, subCategoryId, title, sort } = req.query;
  const queryObject = { active: true };
  if (categoryId) {
    queryObject.categoryId = categoryId;
  }
  if (subCategoryId) {
    queryObject.subCategoryId = subCategoryId;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }
  let apiData = productModel.find(queryObject);
  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }
  try {
    const products = await apiData;
    if (products) {
      res.status(200).send({
        baseResponse: { status: 1, msg: "Products Found" },
        response: { categories: products },
      });
    } else {
      return res.status(200).send({
        baseResponse: { status: 0, msg: "No Products Found" },
      });
    }
  } catch (error) {
    return res.status(200).send({
      baseResponse: { status: 0, msg: error.message },
    });
  }
};
module.exports = { addProduct, getAllProducts };
