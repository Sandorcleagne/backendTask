const mongoose = require("mongoose");
const connectDb = async (DATABASE_URL) => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected Sucessfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
