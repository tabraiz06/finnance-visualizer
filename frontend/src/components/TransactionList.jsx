import React from "react";
import axios from "axios";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    onDelete();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              💸 ₹{tx.amount} - {tx.description} ({tx.date})
            </span>
            <div className="space-x-2">
              <button onClick={() => onEdit(tx)} className="text-blue-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(tx._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
