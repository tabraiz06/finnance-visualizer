const Transaction = require("../models/Transaction.js");

 const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

 const addTransaction = async (req, res) => {
  const { amount, date, description } = req.body;
  const transaction = await Transaction.create({ amount, date, description });
  res.status(201).json(transaction);
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, date, description } = req.body;

  try {
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
    
    
    module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    };
