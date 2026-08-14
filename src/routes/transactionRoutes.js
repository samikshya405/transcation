import express from "express";
import {
    addNewTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionByID,
  updateTransaction,
} from "../controllers/transactionController.js";
const router = express.Router();

router.get("/transaction", getAllTransactions);
router.get("/transaction/:id", getTransactionByID);
router.post("/transaction",addNewTransaction);
router.patch("/transaction/:id",updateTransaction)
router.delete("/transaction/:id",deleteTransaction)

export default router;
