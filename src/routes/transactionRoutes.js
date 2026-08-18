import express from "express";
import {
  addNewTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionByID,
  updateTransaction,
} from "../controllers/transactionController.js";
import validateTransaction from "../middleware/validateTransaction.js";
import { loginUsers, registeruser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/transaction", authMiddleware, getAllTransactions);
router.get("/transaction/:id", getTransactionByID);
router.post("/transaction", validateTransaction, addNewTransaction);
router.patch("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);
router.post("/auth/register", registeruser);
router.post("/auth/login", loginUsers);

export default router;
