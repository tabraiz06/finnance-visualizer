import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionForm = ({ onSuccess, editing, setEditing }) => {
  const [form, setForm] = useState({ amount: "", date: "", description: "" });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.date || !form.description) return;

    try {
      if (editing?._id) {
        await axios.put(
          `http://localhost:5000/api/transactions/${editing._id}`,
          form
        );
        setEditing(null);
      } else {
        await axios.post("http://localhost:5000/api/transactions", form);
      }
      setForm({ amount: "", date: "", description: "" });
      onSuccess();
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editing ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
