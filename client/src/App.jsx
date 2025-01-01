import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Reports from "./pages/Reports";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserContext } from "./context/UserContext.js";
import About from "./pages/About";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";

function App() {
  const { user } = useUserContext();
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-full">
        <Navbar />
        <main className="container h-[calc(100dvh-70px)] mx-auto px-4 py-7">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <About />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
