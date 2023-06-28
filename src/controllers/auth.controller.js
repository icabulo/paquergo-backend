import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Database from "../config/database.js";
const database = new Database();

import CONFIG from "../config/config.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    await database.connect();
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["Invalid credentials"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      //   username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // for https = true. for dev environment set it to false
      //   sameSite: "none",
    });

    await database.disconnect();

    // TODO: SEE IF IT WILL BE NICE TO FETCH USER DATA RIGHT AFTER LOGIN
    res.json({
      message: "user Logged in - token created",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, CONFIG.TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    await database.connect();

    const userFound = await User.findById(user.id);
    await database.disconnect();
    if (!userFound) return res.sendStatus(401);
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    // secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
