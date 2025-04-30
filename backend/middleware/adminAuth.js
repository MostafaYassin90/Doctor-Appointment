// import jwt from "jsonwebtoken";
// import "dotenv/config";

// const adminAuth = async (req, res, next) => {
//   const adminAuth = req.headers.authorization && req.headers.authorization.split(" ")[1];

//   if (!adminAuth) {
//     return res.status(401).json({ message: "No Token Provided, Access Denied UnAuthentication." });
//   }

//   const enCodedToken = jwt.verify(adminAuth, process.env.JWT_SECRET_KEY);

//   if (process.env.ADMIN_EMAIL === enCodedToken.email && process.env.ADMIN_PASSWORD === enCodedToken.password) {
//     next();
//   } else {
//     return res.status(403).json({ message: "You Don't Have Permission To Access This Resources Fobidden. " });
//   }

// };
// export default adminAuth;

import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const adminAuthor = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!adminAuthor) {
    return res.status(401).json({ message: "No Token Provided, Access Denied UaAuthentication." });
  }

  const decondedToken = jwt.verify(adminAuthor, process.env.JWT_SECRET_KEY);

  if (decondedToken.email === process.env.ADMIN_EMAIL && decondedToken.password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    return res.status(403).json({ message: "You Don't Have Permission To Access This Resources, Forbidden" });
  }

};
export default adminAuth;