const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, require: true, trim: true },
    categoryId: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subCategorie", subCategorySchema);
module.exports = subCategoryModel;
