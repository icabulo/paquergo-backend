import app from "./app.js";
import CONFIG from "./config/config.js";
// import Database from "./config/database.js"; //to connect to the DB as soon as the server starts

async function main() {
  try {
    // const database = new Database();
    // await database.connect();
    app.listen(CONFIG.PORT, () => {
      console.log("Server initialized on port ", CONFIG.PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
