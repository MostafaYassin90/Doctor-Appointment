import jwt from "jsonwebtoken";

const docAuth = async (req, res, next) => {
  const authDoc = req.headers.authorization;
  if (!authDoc) {
    return res.status(401).json({ message: "No Token Provided Access Denied, UsAuthenticated." });
  }

  if (authDoc) {
    const token = await req.headers.authorization.split(" ")[1];
    const deCodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.docId = deCodedToken.id;
    next();
  } else {
    return res.status(403).json({ message: "Invalid Credentials.", success: false });
  }

};
export default docAuth;