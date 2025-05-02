import { useState } from "react";
import { registerService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerService(user);

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        console.log("User registered successfully:", data);
        alert("Registered successfully");
        navigate("/login");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 max-w-96 mx-auto mt-20">
      <h1 className="text-4xl text-amber-500 text-center">Sign up!</h1>
      <form onSubmit={registerUser} className="mt-8 flex flex-col">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
