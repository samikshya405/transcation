import express from "express";
import transactionRoutes from "./src/routes/transactionRoutes.js";
const port = 3000;
const app = express();
app.use(express.json());
app.use(transactionRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
