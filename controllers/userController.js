const CRMUserModel = require("../models/CRMUser");
const websiteUserModel = require("../models/websiteUsers");
const jwt = require("jsonwebtoken");
const { nameRegex, emailValidation } = require("../utils/regex");

const crmUserRegister = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const checkEmail = await CRMUserModel.findOne({ email: email });
    if (checkEmail) {
      res
        .status(200)
        .send({ baseResponse: { status: 0, msg: "Email Already Exist" } });
    } else {
      if (name && email && password) {
        const doc = new CRMUserModel({
          name: name,
          email: email,
          password: password,
        });
        await doc.save();
        res.status(200).send({
          baseResponse: {
            status: 1,
            msg: "User Registered Sucessfully",
          },
        });
      } else {
        res.status(200).send({
          baseResponse: { status: 0, msg: "All feilds are required" },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const crmUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).send({
        baseResponse: { status: 0, msg: "All feilds are required" },
      });
    } else {
    }
    const checkUser = await CRMUserModel.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (checkUser) {
      const accesstoken = jwt.sign(
        {
          username: checkUser.name,
        },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: "30s" }
      );
      const refreshtoken = jwt.sign(
        {
          username: checkUser.name,
        },
        process.env.REFRESH_TOKEN_SECRETE,
        { expiresIn: "1d" }
      );
      await CRMUserModel.updateOne(
        {
          $and: [{ email: email }, { password: password }],
        },
        { $set: { refreshToken: refreshtoken } }
      );
      res.cookie("jwt", accesstoken, {
        httpOnly: true,
        maxAge: 1000,
      });
      res.status(200).send({
        baseResponse: { status: 1, msg: "user logged in successfully" },
        response: { accesstoken: accesstoken },
      });
    } else {
      res.status(200).send({
        baseResponse: { status: 0, msg: "user id or password is wrong" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const crmUserLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(200).send({
      baseResponse: { status: 0, msg: "no cookie found" },
    });
  } else {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "cookie cleared" });
    console.log(cookies);
  }
};
const websiteRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log(req.body);
    const checkEmail = await websiteUserModel.findOne({ email: email });
    if (name && email && password) {
      if (nameRegex.test(name) === false) {
        res.status(200).send({
          baseResponse: {
            status: 0,
            msg: "Please enter alphabet only for Fisrt Name and Last Name",
          },
        });
      } else if (checkEmail) {
        res.status(200).send({
          baseResponse: {
            status: 0,
            msg: "User Already Exist",
          },
        });
      } else if (emailValidation.test(email) === false) {
        res.status(200).send({
          baseResponse: {
            status: 0,
            msg: "Please enter valid email",
          },
        });
      } else {
        const doc = new websiteUserModel({
          name: name,
          email: email,
          password: password,
        });
        await doc.save();
        res.status(200).send({
          baseResponse: {
            status: 1,
            msg: "User Registered Sucessfully",
          },
        });
      }
    } else {
      res.status(200).send({
        baseResponse: { status: 0, msg: "All feilds are required" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const websiteLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).send({
        baseResponse: { status: 0, msg: "All feilds are required" },
      });
    } else {
    }
    const checkUser = await CRMUserModel.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (checkUser) {
      const accesstoken = jwt.sign(
        {
          username: checkUser.name,
        },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: "30s" }
      );
      const refreshtoken = jwt.sign(
        {
          username: checkUser.name,
        },
        process.env.REFRESH_TOKEN_SECRETE,
        { expiresIn: "1d" }
      );
      await CRMUserModel.updateOne(
        {
          $and: [{ email: email }, { password: password }],
        },
        { $set: { refreshToken: refreshtoken } }
      );
      res.cookie("jwt", accesstoken, {
        httpOnly: true,
        maxAge: 1000,
      });
      res.status(200).send({
        baseResponse: { status: 1, msg: "user logged in successfully" },
        response: { accesstoken: accesstoken },
      });
    } else {
      res.status(200).send({
        baseResponse: { status: 0, msg: "user id or password is wrong" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const verifyToken = async (req, res) => {
  res.send("verified");
};
module.exports = {
  crmUserRegister,
  crmUserLogin,
  crmUserLogout,
  websiteRegister,
  websiteLogin,
  verifyToken,
};
