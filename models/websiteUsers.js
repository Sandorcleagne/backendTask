const mongoose = require("mongoose");
const websiteUserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    refreshToken: { type: String, trim: true },
    active: { type: Boolean, trim: true },
  },
  { timestamps: true }
);

const websiteUserModel = mongoose.model("websiteuser", websiteUserSchema);
module.exports = websiteUserModel;
