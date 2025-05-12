import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      {user ? (
        <div className="flex justify-between items-center space-x-4">
          <Link to="/chat" className="text-2xl text-amber-500 items-start">
            Chat App
          </Link>
          <div className="flex items-center space-x-4">
            <Notification />
            <span>Logged in as {user.name}</span>
            <button
              onClick={logout}
              className="text-cyan-500 hover:underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end space-x-4">
          <Link to="/login" className="text-cyan-500 hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-cyan-500 hover:underline">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
