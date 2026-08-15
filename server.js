import express from "express";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import errorHandlers from "./src/middleware/errorHandlers.js";
import logger from "./src/middleware/logger.js";
const port = 3000;
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
