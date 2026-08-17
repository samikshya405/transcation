import pool from "../config/db.js";

const getAllTransactions = async (req, res) => {
  const result = await pool.query("SELECT * FROM transactions");
  if (result.rows.length === 0) {
    return res.json({
      status: "not success",
      message: "transaction not found",
    });
  }
  res.json({
    status:"success",
    transaction: result.rows,
  });
};
const addNewTransaction = async (req, res) => {
  const transaction = req.body;
  const date = new Date().toISOString().split("T")[0];

  const result = await pool.query(
    `INSERT INTO transactions(type, category, amount, description, date)
 VALUES($1, $2, $3, $4, $5)  RETURNING *`,
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
  const id = req.params.id;
  const transaction = req.body;
  const result = await pool.query(`SELECT * FROM transactions WHERE id=$1`, [
    id,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "not success",
      message: "Transaction not found",
    });
  }
  const exsitingTransaction = result.rows[0];
  const newTransaction = { ...exsitingTransaction, ...transaction };
  const result2 = await pool.query(
    `UPDATE transactions SET(type,category,amount,description,date) = ($1, $2, $3, $4, $5) WHERE id = $6 RETURNING *`,
    [
      newTransaction.type,
      newTransaction.category,
      newTransaction.amount,
      newTransaction.description,
      newTransaction.date,
      id,
    ],
  );
  res.json({
    status: "success",
    tran: result2.rows[0],
  });
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(`DELETE FROM transactions WHERE id = $1`, [
    id,
  ]);
  if (result.rowCount !== 1) {
    return res.status(404).json({
      status: "not success",
      message: "ID not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "transcation succesfully deleted",
  });
};

const getTransactionByID = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(`SELECT * FROM transactions WHERE id = $1`, [
    id,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "not success",
      message: "ID not found",
    });
  }
  res.status(200).json({
    status: "success",
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
