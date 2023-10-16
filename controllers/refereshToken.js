const CRMUserModel = require("../models/CRMUser");
const jwt = require("jsonwebtoken");
const handelRefereshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log("cookies", cookies);
    if (!cookies?.jwt) {
      res.status(401).send({
        baseResponse: { status: 0, msg: "User Unauthurized" },
      });
    }
    const refreshToken = cookies.jwt;
    const checkUser = await CRMUserModel.findOne({
      refreshToken: refreshToken,
    });
    if (checkUser) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRETE,
        (err, decoded) => {
          if (err || checkUser.name !== decoded.username) {
            return res.status(403).send({
              baseResponse: { status: 0, msg: "Forbidden" },
            });
          } else {
            const accesstoken = jwt.sign(
              { username: decoded.name },
              process.env.ACCESS_TOKEN_SECRETE,
              { expiresIn: "30s" }
            );
            res.status(200).send({
              baseResponse: { status: 1, msg: "user logged in successfully" },
              response: { accesstoken: accesstoken },
            });
          }
        }
      );
    } else {
      res.status(403).send({
        baseResponse: { status: 0, msg: "forbidden" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handelRefereshToken };
