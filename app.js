const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDb = require("./connection/connection");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { verifyJwt } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
connectDb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", userRoutes, categoryRoutes, subCategoryRoutes, productRoutes);
app.use(express.static(__dirname));
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statuscode = 404;
  next(err);
});
app.use((error, req, res, next) => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || "error";
  res.status(error.statuscode).json({
    status: error.statuscode,
    msg: error.message,
  });
});
app.use(verifyJwt);
app.get("/", async (req, res) => {
  console.log("res.cookie", res.cookie);
  res.json("hello");
});

app.listen(PORT, () => {
  console.log(`server is listen on http://localhost:${PORT}`);
});
