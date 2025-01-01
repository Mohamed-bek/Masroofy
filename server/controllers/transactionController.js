import Transaction from "../models/Transaction.js";
import { Types } from "mongoose";
import moment from "moment";

export const GetUserTransactions = async (req, res) => {
  try {
    const { name, category, startDate, endDate } = req.query;

    const filter = { userId: req.user.id };

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const GetExpenseSummaryByCategory = async (req, res) => {
  try {
    const userId = req.user.id;

    const allCategories = await Transaction.distinct("category", {
      userId: userId,
      type: "expense",
    });

    const expenseSummary = await Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const amounts = allCategories.map((category) => {
      const categoryData = expenseSummary.find((item) => item._id === category);
      return categoryData ? categoryData.totalAmount : 0;
    });
    res.status(200).json({
      categories: allCategories,
      amounts,
    });
  } catch (err) {
    console.error("Error in GetExpenseSummaryByCategory:", err);
    res.status(500).json({
      message: "An error occurred while fetching the expense summary.",
      error: err.message,
    });
  }
};

export const getMonthlyIncomeExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();

    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 5);

    const currentDateUTC = new Date(currentDate.toISOString());
    const sixMonthsAgoUTC = new Date(sixMonthsAgo.toISOString());

    const monthlyData = await Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          createdAt: {
            $gte: sixMonthsAgoUTC,
            $lte: currentDateUTC,
          },
        },
      },
      {
        $project: {
          month: { $month: { $toDate: "$createdAt" } },
          year: { $year: { $toDate: "$createdAt" } },
          type: 1,
          amount: 1,
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const labels = [];
    const incomeData = [];
    const expenseData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i);

      labels.push(date.toLocaleString("default", { month: "short" }));

      const monthData = monthlyData.filter(
        (item) =>
          item._id.year === date.getFullYear() &&
          item._id.month === date.getMonth() + 1
      );

      const income = monthData.find((item) => item._id.type === "income");
      const expense = monthData.find((item) => item._id.type === "expense");

      incomeData.push(income ? income.totalAmount : 0);
      expenseData.push(expense ? expense.totalAmount : 0);

      console.log(`Month: ${labels[5 - i]}`, { monthData, income, expense });
    }

    console.log("Date Range:", sixMonthsAgoUTC, "to", currentDateUTC);
    console.log("Labels:", labels);
    console.log("Income Data:", incomeData);
    console.log("Expense Data:", expenseData);

    res.status(200).json({
      labels,
      incomeData,
      expenseData,
    });
  } catch (err) {
    console.error("Error in getMonthlyIncomeExpense:", err);
    res.status(500).json({
      message: "Failed to fetch monthly summary",
      error: err.message,
    });
  }
};

export const NewTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      userId: req.user.id,
    });
    const transaction = await newTransaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const DeleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const GetUserBudget = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpense += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      income: totalIncome,
      expense: totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const GetUserMonthlyBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const currentDate = moment();
    const fiveMonthsAgo = moment().subtract(5, "months").startOf("month");

    const transactions = await Transaction.find({
      userId,
      createdAt: {
        $gte: fiveMonthsAgo.toDate(),
        $lte: currentDate.endOf("month").toDate(),
      },
    });

    const monthlyData = Array(6)
      .fill()
      .map((_, index) => {
        const month = currentDate.clone().subtract(5 - index, "months");
        const startOfMonth = month.clone().startOf("month");
        const endOfMonth = month.clone().endOf("month");

        const monthlyTransactions = transactions.filter((transaction) => {
          const transactionDate = moment(transaction.createdAt);
          return transactionDate.isBetween(
            startOfMonth,
            endOfMonth,
            "day",
            "[]"
          );
        });

        const { income, expense } = monthlyTransactions.reduce(
          (acc, transaction) => {
            if (transaction.type === "income") {
              acc.income += transaction.amount;
            } else if (transaction.type === "expense") {
              acc.expense += transaction.amount;
            }
            return acc;
          },
          { income: 0, expense: 0 }
        );

        return {
          label: month.format("MMM"),
          balance: income - expense,
        };
      });

    const labels = monthlyData.map((item) => item.label);
    const data = monthlyData.map((item) => item.balance);

    res.status(200).json({
      labels,
      data,
    });
  } catch (error) {
    console.error("Error in GetUserMonthlyBalance:", error);
    res.status(500).json({
      message: "Error fetching monthly balance",
      error: error.message,
    });
  }
};
