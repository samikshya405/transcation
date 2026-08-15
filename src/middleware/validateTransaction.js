const validateTransaction = (req, res, next) => {
  const { type, amount, category, description } = req.body;

  const error = (message) =>
    res.status(400).json({
      status: "not success",
      message,
    });

  if (!type || (type !== "income" && type !== "expense")) {
    return error("Invalid transaction type");
  }

  if (typeof amount !== "number" || amount <= 0) {
    return error("Invalid transaction amount");
  }

  if (!category || !category.trim()) {
    return error("Invalid transaction category");
  }

  if (!description || !description.trim()) {
    return error("Invalid transaction description");
  }

  next();
};

export default validateTransaction;
