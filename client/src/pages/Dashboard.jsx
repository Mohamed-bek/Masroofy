import { useState, useEffect } from "react";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Dashboard() {
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  useEffect(() => {
    const getBudget = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/transaction/budget",
          {
            withCredentials: true,
          }
        );
        setSummary({
          balance: data.balance,
          income: data.income,
          expenses: data.expense,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getBudget();
  }, []);

  const [dataMonthly, setdataMonthly] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const getBudgetAnalytics = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/transaction/balance-analytics",
          {
            withCredentials: true,
          }
        );
        setdataMonthly({
          labels: data.labels,
          data: data.data,
        });
        console.log("Data is  : ", data);
      } catch (error) {
        console.log(error);
      }
    };
    getBudgetAnalytics();
  }, []);

  const monthlyData = {
    labels: dataMonthly.labels,
    datasets: [
      {
        label: "Income",
        data: dataMonthly.data,
        backgroundColor: "#646cff",
        borderColor: "#646cff",
        tension: 0.4, // Smooth line
      },
    ],
  };

  return (
    <div className="space-y-6 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[85%] mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <FaWallet className="text-primary text-3xl" />
            <div>
              <p className="text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold">
                {summary.balance.toLocaleString()} DZD
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <FaArrowUp className="text-green-500 text-3xl" />
            <div>
              <p className="text-gray-500">Total Income</p>
              <p className="text-2xl font-bold">
                {summary.income.toLocaleString()} DZD
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <FaArrowDown className="text-red-500 text-3xl" />
            <div>
              <p className="text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold">
                {summary.expenses.toLocaleString()} DZD
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-[64vh]">
        <Line
          data={monthlyData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
