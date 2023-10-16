const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    price: { type: Number, require: true, trim: true },
    images: { type: Array, require: true, trim: true },
    categoryId: { type: String, require: true, trim: true },
    subCategoryId: { type: String, require: true, trim: true },
    inStock: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
