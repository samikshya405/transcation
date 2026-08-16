// import transactions from "../data/transaction.js";
import pool from "../config/db.js";

const getAllTransactions = async (req, res) => {
  const result = await pool.query("SELECT * FROM transactions");
  console.log("all transaction are loaded successfully");
  res.json({
    status: "success",
    transactions: result.rows,
  });
};
const getTransactionByID = async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query("SELECT * FROM transactions WHERE id = $1", [
    id,
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "not success",
      message: "Id not found",
    });
  }

  res.json({
    status: "success",
    transaction: result.rows[0],
  });
};
const addNewTransaction = async (req, res) => {
  const transaction = req.body;
  const date = new Date().toISOString().split("T")[0];

  const result = await pool.query(
    `INSERT INTO transactions(type, category, amount, description, date)
 VALUES($1, $2, $3, $4, $5)`,
    [
      transaction.type,
      transaction.category,
      transaction.amount,
      transaction.description,
      date,
    ],
  );

  res.status(201).json({
    status: "success",
    message: "transaction has been added",
    transaction: result.rows[0],
  });
};
const updateTransaction = async (req, res) => {
  const id = Number(req.params.id);
  const newTransaction = req.body;

  // 1. Get the existing transaction from PostgreSQL
  const result = await pool.query("SELECT * FROM transactions WHERE id = $1", [
    id,
  ]);

  // 2. Check if it exists
  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "not success",
      message: "Transaction not found",
    });
  }

  // 3. Get the transaction from the result
  const existingTransaction = result.rows[0];

  // 4. Merge old data + whatever the user sent
  const updatedTransaction = {
    ...existingTransaction,
    ...newTransaction,
  };

  // 5. Update PostgreSQL
  const updatedResult = await pool.query(
    `UPDATE transactions
     SET type = $1,
         category = $2,
         amount = $3,
         description = $4,
         date = $5
     WHERE id = $6
     RETURNING *`,
    [
      updatedTransaction.type,
      updatedTransaction.category,
      updatedTransaction.amount,
      updatedTransaction.description,
      updatedTransaction.date,
      id,
    ],
  );

  // 6. Send the updated transaction back
  res.json({
    status: "success",
    transaction: updateTransaction,
  });
};
const deleteTransaction = async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "not success",
      message: "Transaction not found",
    });
  }

  res.json({
    status: "success",
    message: "Transaction deleted successfully",
    transaction: result.rows[0],
  });
};
export {
  getAllTransactions,
  getTransactionByID,
  addNewTransaction,
  updateTransaction,
  deleteTransaction,
};
