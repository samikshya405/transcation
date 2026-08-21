import dotenv from "dotenv";
import pool from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();

pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected ✅");
    console.log(result.rows);
  })
  .catch((error) => {
    console.log("Database connection failed ❌");
    console.log(error.message);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
