// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/");
      return;
    }

    setUsername(storedUsername);
  }, [navigate]);

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default Dashboard;
