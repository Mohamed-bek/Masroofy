import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaList, FaPlus, FaChartPie } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useUserContext } from "../context/userContext";

function Navbar() {
  const { user, login } = useUserContext();
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-2xl font-bold text-primary">
            Masroofy
          </NavLink>
          {user ? (
            <>
              {" "}
              <div className="flex space-x-4 items-center justify-center gap-3 text-[1.1rem]">
                <NavLink
                  to="/"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                >
                  <FaHome />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/transactions"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                >
                  <FaList />
                  <span>Transactions</span>
                </NavLink>
                <NavLink
                  to="/add-transaction"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                >
                  <FaPlus />
                  <span>Add</span>
                </NavLink>
                <NavLink
                  to="/reports"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                >
                  <FaChartPie />
                  <span>Reports</span>
                </NavLink>
              </div>{" "}
              <button
                onClick={() => {
                  login(null);
                  navigate("/");
                }}
                className="flex justify-center items-center gap-2 cursor-pointer bg-primary text-white font-medium px-3 py-2 rounded-lg text-[1.1rem] hover:bg-primaryHover duration-300"
              >
                {" "}
                LogOut
                <LuLogOut />{" "}
              </button>{" "}
            </>
          ) : (
            <div className="flex justify-center items-center gap-2 font-semibold text-[1.1rem]">
              <NavLink
                to="/login"
                className=" px-3 py-2 border border-primary border-solid cursor-pointer text-primary rounded-lg hover:bg-primary hover:text-white duration-300"
              >
                {" "}
                Login{" "}
              </NavLink>
              <NavLink
                to="/register"
                className="bg-primary px-3 py-2 text-white rounded-lg hover:bg-primaryHover duration-300"
              >
                {" "}
                Register{" "}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
