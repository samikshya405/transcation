import express from "express";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import errorHandlers from "./src/middleware/errorHandlers.js";
import logger from "./src/middleware/logger.js";

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
const app = express();
app.use(express.json());
app.use(logger);
app.use(transactionRoutes);
app.use((req, res) => {
  return res.status(404).json({
    status: "not success",
    message: "Route not found",
  });
});
app.use(errorHandlers);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
