import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, CONFIG.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.tokenId = decoded.id; //injecting token id into the request body
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
