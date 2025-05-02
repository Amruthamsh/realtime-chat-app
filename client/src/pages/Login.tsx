import { useState } from "react";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginService(user);
      if (res.status >= 200 && res.status < 300) {
        const data = res.data;
        login(res.data.user, res.data.token);
        console.log("User logged in successfully:", data);

        alert("Logged in successfully");

        navigate("/chat");
      } else {
        console.error("Error logging in user");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="p-4 max-w-96 mx-auto mt-20">
      <h1 className="text-4xl text-amber-500 text-center">Welcome back!</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-500 justify-center text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
