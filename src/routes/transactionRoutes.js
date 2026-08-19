import express from "express";
import {
  addNewTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionByID,
  updateTransaction,
} from "../controllers/transactionController.js";
import validateTransaction from "../middleware/validateTransaction.js";
import { getCurrentUser, loginUsers, registeruser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/transaction", authMiddleware, getAllTransactions);
router.get("/transaction/:id",authMiddleware, getTransactionByID);
router.post("/transaction",authMiddleware, validateTransaction, addNewTransaction);
router.patch("/transaction/:id",authMiddleware, updateTransaction);
router.delete("/transaction/:id",authMiddleware, deleteTransaction);
router.post("/auth/register", registeruser);
router.post("/auth/login", loginUsers);
router.get("/auth/me",authMiddleware,getCurrentUser);

export default router;
