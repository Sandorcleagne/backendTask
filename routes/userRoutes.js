const express = require("express");
const router = express.Router();
const {
  crmUserRegister,
  crmUserLogin,
  crmUserLogout,
  websiteRegister,
  websiteLogin,
  verifyToken,
} = require("../controllers/userController");
const { handelRefereshToken } = require("../controllers/refereshToken");
const loginLimiter = require("../middlewares/loginLimiter");
const { verifyJwt } = require("../middlewares/verifyJWT");
router.post("/crmuserregister", crmUserRegister);
router.post("/websiteregister", websiteRegister);
router.post("/crmuserlogin", loginLimiter, crmUserLogin);
router.post("/websitelogin", loginLimiter, websiteLogin);
router.get("/refreshtoken", handelRefereshToken);
router.post("/logout", crmUserLogout);
router.get("/verifyToken", verifyJwt, verifyToken);
router.get("/");
module.exports = router;
