import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { ChatContextProvider } from "./context/ChatContext";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <>
      <ChatContextProvider user={user}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </ChatContextProvider>
    </>
  );
}

export default App;
