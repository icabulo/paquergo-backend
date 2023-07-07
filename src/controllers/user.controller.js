import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import Database from "../config/database.js";

export const register = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();

    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // for https = true. for dev environment set it to false
      sameSite: "none",
    });

    await database.disconnect();

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();
    const users = await User.find();
    await database.disconnect();
    if (users.length) return res.json(users);
    return res.status(204);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const database = new Database();
    await database.connect();
    const { key, value } = req.params;
    const query = {};
    query[key] = value;
    const items = await User.find(query);
    await database.disconnect();
    if (!items.length)
      return res.status(209).send(`${key} = ${value} - not found`);
    // found items can only be accessed from an authenticated user
    if (items[0]._id.toString() !== req.tokenId)
      return res.status(403).send(`Access denied - user scope rights`);
    req.body.items = items; // injeccion de dependencias> dependency injection
    next();
  } catch (error) {
    const { key, value } = req.params;
    res
      .status(500)
      .json({ ...error, customErrorMessage: `not found, ${key} = ${value} ` });
  }
};

export const getOne = (req, res) => {
  try {
    // console.log(req.body.items);
    res.json(req.body.items[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();
    let item = req.body.items[0];
    item = Object.assign(item, req.body); // {...item, ...req.body}
    const newItem = await item.save();
    await database.disconnect();
    res.json(newItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOne = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();
    let item = req.body.items[0];
    const deleted = await item.deleteOne();
    await database.disconnect();
    res.json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};
