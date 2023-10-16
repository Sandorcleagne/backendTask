const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts for this IP, Please try again after 60 seconds",
  },
  handler: (req, res, next, options) => {
    res
      .status(200)
      .send({ baseResponse: { status: 0, msg: "Too many login attempt" } });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
