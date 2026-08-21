import express from "express";
import logger from "./middleware/logger.js";
import errorHandlers from "./middleware/errorHandlers.js";
import transactionRoutes from './routes/transactionRoutes.js'
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
export default app;
