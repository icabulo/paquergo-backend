import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

export default app;
