import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const welcomeText =
  "<div> <h1>Welcome to PaquerGO API</h1> <p>See instructions on the Github repository:</p><p><strong>https://github.com/icabulo/paquergo-backend</strong></p></div>";

// Root route
app.get("/", (req, res) => {
  res.send(welcomeText);
});

// User routes
app.use("/api/user", userRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

export default app;
