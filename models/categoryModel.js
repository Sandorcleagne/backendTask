const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categorie", categorySchema);
module.exports = categoryModel;
