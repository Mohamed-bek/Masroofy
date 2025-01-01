import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTransaction() {
  const [transaction, setTransaction] = useState({
    name: null,
    amount: null,
    type: "expense",
    category: null,
    note: null,
  });

  const categoriesIncome = [
    "Salary",
    "Freelance",
    "Business Income",
    "Investments",
    "Rental Income",
    "Dividends",
    "Commission",
    "Bonus",
    "Part-time Work",
    "Side Projects",
    "Consulting",
    "Royalties",
    "Interest Income",
    "Pension",
    "Social Security",
    "Gifts Received",
    "Tax Returns",
    "Other Income",
  ];

  const categoriesExpenses = [
    "Housing & Rent",
    "Utilities",
    "Groceries",
    "Transportation",
    "Healthcare & Medical",
    "Insurance",
    "Dining Out",
    "Entertainment",
    "Shopping",
    "Personal Care",
    "Education",
    "Debt Payments",
    "Savings & Investments",
    "Gifts & Donations",
    "Pet Expenses",
    "Home Maintenance",
    "Subscriptions",
    "Travel",
    "Childcare",
    "Miscellaneous",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !transaction.amount ||
      !transaction.name ||
      !transaction.type ||
      !transaction.category
    ) {
      toast.error("Data Missing");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/transaction`,
        transaction,
        {
          withCredentials: true,
        }
      );

      toast.success("Transaction added successfully!");

      setTransaction({
        name: null,
        amount: null,
        type: "expense",
        category: null,
        note: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-7">
      <ToastContainer />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-2">Transaction Name</label>
            <input
              type="text"
              value={transaction.name}
              onChange={(e) =>
                setTransaction({ ...transaction, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Amount (DZD)</label>
            <input
              type="number"
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({ ...transaction, amount: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={transaction.type}
              onChange={(e) => {
                setTransaction({
                  ...transaction,
                  type: e.target.value,
                });
              }}
              className="w-full p-2 border rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={transaction.category}
              onChange={(e) =>
                setTransaction({ ...transaction, category: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {transaction.type === "expense"
                ? categoriesExpenses.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                : categoriesIncome.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              value={transaction.note}
              onChange={(e) =>
                setTransaction({ ...transaction, note: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
