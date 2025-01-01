import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [pieData, setPieData] = useState({
    categories: [],
    amounts: [],
  });
  const [barData, setBarData] = useState({
    labels: [],
    incomeData: [],
    expenseData: [],
  });

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/transaction/expense-by-category",
          {
            withCredentials: true,
          }
        );

        if (data.categories && data.amounts) {
          setPieData({
            categories: data.categories,
            amounts: data.amounts,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_API_URL + "/transaction/analytics",
          {
            withCredentials: true,
          }
        );
        setBarData({
          labels: data.labels,
          incomeData: data.incomeData,
          expenseData: data.expenseData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAnalytics();
  }, []);

  const monthlyData = {
    labels: barData.labels,
    datasets: [
      {
        label: "Income",
        data: barData.incomeData,
        backgroundColor: "#646cff",
      },
      {
        label: "Expenses",
        data: barData.expenseData,
        backgroundColor: "#FFC107",
      },
    ],
  };

  const orderData = {
    labels: pieData.categories,
    datasets: [
      {
        label: "User",
        data: pieData.amounts,
        backgroundColor: [
          "#646cff",
          "#FFC107",
          "#E91E63",
          "#9C27B0",
          "#FF9800",
          "#2196F3",
        ],
        borderColor: "rgb(0 146 68)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  return (
    <div className="min-h-[calc(100dvh-70px)] pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
          <Pie data={orderData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
