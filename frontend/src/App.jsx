import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/api/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Personal Finance Visualizer
      </h1>
      <TransactionForm
        onSuccess={fetchTransactions}
        editing={editing}
        setEditing={setEditing}
      />
      <TransactionList
        transactions={transactions}
        onDelete={fetchTransactions}
        onEdit={setEditing}
      />
      <MonthlyBarChart data={transactions} />
    </div>
  );
};

export default App;

