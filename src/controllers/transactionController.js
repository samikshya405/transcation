import transactions from "../data/transaction.js";

const getAllTransactions = (req, res) => {
  console.log("all transaction are loaded successfully");
  res.json({
    status: "success",
    transactions,
  });
};
const getTransactionByID = (req,res)=>{
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
  })
}
const addNewTransaction=(req,res)=>{
 const transaction = req.body;

  
  const date = new Date().toISOString().split("T")[0];
  const transactionToAdd = { ...transaction, id: Date.now(), date };
  transactions.push(transactionToAdd);
  res.json({
    status: "success",
    message: "transaction has been added",
    transaction: transactionToAdd,
  });
}
const updateTransaction =(req,res)=>{
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
}
const deleteTransaction=(req,res)=>{
    const id = Number(req.params.id);
    const index = transactions.findIndex((item=>item.id===id));
    if(index===-1){
        return res.status(404).json({
            status:"not success",
            message:"invalid transaction"
        })
    }
    transactions.splice(index,1)
    res.json({
        status:"success",
        transactions
    })
}
export {getAllTransactions,getTransactionByID, addNewTransaction,updateTransaction, deleteTransaction};
