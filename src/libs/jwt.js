// import { CONFIG.TOKEN_SECRET } from "../config.js";
import CONFIG from "../config/config.js";
import jwt from "jsonwebtoken";

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      CONFIG.TOKEN_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
