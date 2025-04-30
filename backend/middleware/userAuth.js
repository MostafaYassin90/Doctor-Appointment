import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const userToken = await req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ message: "No Token Provided Access Denied, UnAuthentication." });
  }

  if (userToken) {
    const token = await req.headers.authorization.split(" ")[1];
    const deCodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = deCodedToken.id;
    next();
  } else {
    return res.status(403).json({ message: "Invalid Credentials.", success: false });
  }
};

export default userAuth;