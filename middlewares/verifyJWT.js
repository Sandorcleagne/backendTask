const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(500).send({
      baseResponse: { status: 0, msg: "user unauthorized++" },
    });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
    if (err)
      return res.status(200).send({
        baseResponse: { status: 0, msg: "forbidden" },
      });
    req.user = decoded.name;
    next();
  });
};

module.exports = { verifyJwt };
