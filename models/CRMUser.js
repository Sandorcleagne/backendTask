const mongoose = require("mongoose");
const CRMUserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    refreshToken: { type: String, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CRMUserModel = mongoose.model("CRMUser", CRMUserSchema);
module.exports = CRMUserModel;
