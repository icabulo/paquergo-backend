import * as dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  DB_CONNECTION:
    process.env.MONGODB_URI || "mongodb://127.0.0.1/test=db-paquergo",
  TOKEN_SECRET: process.env.TOKEN_SECRET || "secret",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
