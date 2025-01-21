import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = getCookie("user_name");
    const userEmail = getCookie("user_email");

    if (userName && userEmail) {
      setUser({ name: userName, email: userEmail });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const getCookie = (name: string) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) return match[2];
    return null;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        {user ? (
          <div>
            <h3>Welcome, {user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
