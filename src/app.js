import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import wasteRoutes from "./routes/waste.routes.js";
import pacaRoutes from "./routes/paca.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
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

// Waste routes
app.use("/api/waste", wasteRoutes);

// Waste routes
app.use("/api/paca", pacaRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

export default app;
