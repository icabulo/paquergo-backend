import mongoose from "mongoose";
import CONFIG from "./config.js"; // get connection string from config.js file

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    //if there is a connection use it, do not create a new connection
    if (this.connection) return this.connection;

    return mongoose
      .connect(CONFIG.DB_CONNECTION)
      .then((connection) => {
        this.connection = connection;
        console.log("Database connected!!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async disconnect() {
    return mongoose
      .disconnect()
      .then(() => {
        console.log("Database disconnected");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default Database;

/* // this is a different way to setup connect and disconnect functions without a class object
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect(MONGODB_URI);
    console.log("MongoDB is disconnected");
  } catch (error) {
    console.error(error);
  }
}; */
