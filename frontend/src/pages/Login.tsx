import React from "react";

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/login";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Please log in with Google</h2>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
