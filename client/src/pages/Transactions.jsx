import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    startDate: "",
    endDate: "",
    name: "",
  });

  const categories = [
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

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/transaction",
          {
            params: {
              name: filter.name,
              category: filter.category,
              startDate: filter.startDate,
              endDate: filter.endDate,
            },
            withCredentials: true,
          }
        );
        setTransactions(data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + "/transaction/" + id, {
        withCredentials: true,
      });
      toast.success("Transaction Deleted successful!");
      const TransFiltred = transactions.filter((tran) => tran._id !== id);
      setTransactions(TransFiltred);
    } catch (error) {
      toast.error("Fail To Deleted Transaction. Please try again.");
      console.log(error);
    }
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Date", "Name", "Category", "Type", "Amount"],
      ...transactions.map((transaction) => [
        new Date(transaction.createdAt).toLocaleDateString("en-GB"),
        transaction.name,
        transaction.category,
        transaction.type,
        transaction.amount,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions Report", 20, 10);

    const tableColumn = ["Date", "Name", "Category", "Type", "Amount"];
    const tableRows = transactions.map((transaction) => [
      new Date(transaction.createdAt).toLocaleDateString("en-GB"),
      transaction.name,
      transaction.category,
      transaction.type,
      transaction.amount.toLocaleString() + " DZD",
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("transactions_report.pdf");
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="bg-white py-2 pt-4 px-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <div className="mb-4 flex space-x-2">
            <button
              onClick={exportToCSV}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Export as CSV
            </button>
            <button
              onClick={exportToPDF}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Export as PDF
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search transactions..."
            className="p-2 border rounded"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) =>
                setFilter({ ...filter, startDate: e.target.value })
              }
              className="p-2 border rounded w-1/2"
            />
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) =>
                setFilter({ ...filter, endDate: e.target.value })
              }
              className="p-2 border rounded w-1/2"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-t">
                  <td className="p-4">
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td className="p-4">{transaction.name}</td>
                  <td className="p-4">{transaction.category}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {transaction.amount.toLocaleString()} DZD
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
