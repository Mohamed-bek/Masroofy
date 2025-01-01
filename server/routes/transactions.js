import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  GetUserTransactions,
  DeleteTransaction,
  NewTransaction,
  GetUserBudget,
  GetExpenseSummaryByCategory,
  getMonthlyIncomeExpense,
  GetUserMonthlyBalance,
} from "../controllers/transactionController.js";

const transactionRouter = Router();
transactionRouter.get("/budget", auth, GetUserBudget);

transactionRouter.get("/", auth, GetUserTransactions);

transactionRouter.get(
  "/expense-by-category",
  auth,
  GetExpenseSummaryByCategory
);

transactionRouter.get("/analytics", auth, getMonthlyIncomeExpense);

transactionRouter.get("/balance-analytics", auth, GetUserMonthlyBalance);

transactionRouter.post("/", auth, NewTransaction);

transactionRouter.delete("/:id", auth, DeleteTransaction);

export default transactionRouter;
