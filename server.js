import express from "express";
const port = 3000;
const app = express();
app.use(express.json());

const transactions = [
  {
    id: 1,
    type: "income",
    category: "Salary",
    amount: 1500,
    description: "Weekly salary",
    date: "2026-08-10",
  },
  {
    id: 2,
    type: "expense",
    category: "Rent",
    amount: 670,
    description: "Weekly rent",
    date: "2026-08-11",
  },
  {
    id: 3,
    type: "income",
    category: "Freelance",
    amount: 350,
    description: "Website development",
    date: "2026-08-12",
  },
  {
    id: 4,
    type: "expense",
    category: "Groceries",
    amount: 120,
    description: "Weekly groceries",
    date: "2026-08-12",
  },
  {
    id: 5,
    type: "income",
    category: "Bonus",
    amount: 200,
    description: "Work bonus",
    date: "2026-08-13",
  },
  {
    id: 6,
    type: "expense",
    category: "Transport",
    amount: 65,
    description: "Fuel expense",
    date: "2026-08-13",
  },
];

app.get("/transaction", (req, res) => {
  console.log("all transaction are loaded successfully");
  res.json({
    status: "success",
    transactions,
  });
});

app.get("/transaction/:id", (req, res) => {
  const id = Number(req.params.id);
  const transaction = transactions.find((item) => item.id === id);

  if (!transaction) {
    return res.status(404).json({
      status: "not success",
      message: "Id not found",
    });
  }
  res.json({
    status: "sucess",
    transaction,
  });
});
//adding transaction

app.post("/transaction", (req, res) => {
  const transaction = req.body;

  if (
    !transaction.type ||
    (transaction.type !== "income" && transaction.type !== "expense") ||
    !transaction.amount ||
    typeof transaction.amount !== "number" ||
    transaction.amount <= 0 ||
    !transaction.category
  ) {
    return res.status(400).json({
      status: "not success",
      message: "Transaction invalid",
    });
  }
  const date = new Date().toISOString().split("T")[0];
  const transactionToAdd = { ...transaction, id: Date.now(), date };
  transactions.push(transactionToAdd);
  res.json({
    status: "success",
    message: "transaction has been added",
    transaction: transactionToAdd,
  });
});
app.patch("/transaction/:id", (req, res) => {
  const id = Number(req.params.id);
  const newTransaction = req.body;

  const transcationIndex = transactions.findIndex((item) => item.id === id);
  if (transcationIndex === -1) {
    return res.status(404).json({
      status: "not success",
      message: "Transaction not found",
    });
  }
  const updatedTransaction = {
    ...transactions[transcationIndex],
    ...newTransaction,
  };

  if (
    !updatedTransaction.type ||
    (updatedTransaction.type !== "income" &&
      updatedTransaction.type !== "expense") ||
    !updatedTransaction.amount ||
    typeof updatedTransaction.amount !== "number" ||
    updatedTransaction.amount <= 0 ||
    !updatedTransaction.category
  ) {
    return res.status(400).json({
      status: "not success",
      message: "Transaction invalid",
    });
  }
  transactions[transcationIndex] = updatedTransaction;
  res.json({
    status: "success",
    updatedTransaction,
  });
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
