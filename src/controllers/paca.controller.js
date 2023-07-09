// NOTE: SOME CONTROLLERS ARE THE SAME AS IN THE WASTE.CONTROLLES. LATER IT WILL BE NICE TO RE-USE THEM
// import User from "../models/user.model.js";
import Paca from "../models/paca.model.js";
import Database from "../config/database.js";

export const createPaca = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();

    // validating user rights. e.g., a user tries to create a wasta alert for a different userId.
    // console.log("user validation", req.body.user, req.tokenId, req.body);
    if (req.body.user !== req.tokenId)
      return res.status(403).send(`Access denied - user scope rights`);

    // creating the user
    const newUser = new Paca(req.body);

    // saving the user in the database
    const pacaSaved = await newUser.save();

    await database.disconnect();

    res.json(pacaSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPaca = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();
    const pacas = await Paca.find().populate({
      path: "user",
      select: ["username", "currentRole", "mapLocation"],
    });
    await database.disconnect();
    if (pacas.length) return res.json(pacas);
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
    // console.log("query", query);
    // let items = await Paca.find(query);
    let items = await Paca.find(query).populate({
      path: "user",
      select: ["username", "currentRole", "mapLocation"],
    });
    // console.log("result", items, items.length);
    await database.disconnect();
    if (!items.length)
      return res.status(209).send(`${key} = ${value} - not found`);
    // as the query can returns documents for different users then
    // found items can only be accessed from an authenticated user (auth middleware)
    if (items[0].user._id.toString() !== req.tokenId)
      // beware user is an object when .pupulate() method is used
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

export const getListOneUser = (req, res) => {
  try {
    // console.log(req.body.items);
    res.json(req.body.items);
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
