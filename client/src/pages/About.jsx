import React from "react";
import {
  FaBell,
  FaChartBar,
  FaCreditCard,
  FaFilter,
  FaMailBulk,
} from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[5rem] font-bold text-primary mb-4">Masroofy</h1>
          <p className="text-xl text-primaryHover">
            Your Personal Budget & Expense Tracker
          </p>
        </div>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            App Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Masroofy is a user-friendly web application designed to help you
            take control of your finances. Whether you're tracking daily
            expenses, monitoring income, or analyzing your spending patterns,
            Masroofy provides the tools you need to make informed financial
            decisions.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <FaCreditCard className="text-primary w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Transaction Tracking
                </h3>
                <p className="text-gray-600">
                  Easy recording of income and expenses with categorization
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaChartBar className="text-primary w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Visual Reports</h3>
                <p className="text-gray-600">
                  Interactive pie and bar charts for spending analysis
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaFilter className="text-primary w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Smart Filtering</h3>
                <p className="text-gray-600">
                  Filter transactions by date range or category
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaBell className="text-primary w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Balance Tracking</h3>
                <p className="text-gray-600">
                  Real-time monitoring of your financial balance
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium text-gray-900 mb-2">
                1. Add Transactions
              </h3>
              <p className="text-gray-600">
                Enter your income or expenses using our simple form. Categorize
                each transaction and add notes for better organization.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium text-gray-900 mb-2">
                2. View Reports
              </h3>
              <p className="text-gray-600">
                Access visual reports showing your spending patterns, category
                breakdowns, and financial trends over time.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium text-gray-900 mb-2">
                3. Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your financial health with real-time balance updates and
                spending alerts.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Additional Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <LuFileSpreadsheet className="text-primary w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Data Export</h3>
                <p className="text-gray-600">
                  Export your financial data in CSV or PDF format
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaBell className="text-primary w-6 h-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Budget Alerts</h3>
                <p className="text-gray-600">
                  Receive notifications when approaching budget limits
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Contact & Feedback
          </h2>
          <div className="flex items-start space-x-4">
            <FaMailBulk className="text-primary w-6 h-6 mt-1" />
            <div>
              <p className="text-gray-600">
                We value your feedback! If you have any questions, suggestions,
                or concerns, please reach out to us at{" "}
                <a href="mailto:support@masroofy.com" className="text-primary">
                  support@masroofy.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
