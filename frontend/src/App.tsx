import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start"; // 新的开始页面
import Login from "./pages/Login"; // 之前的 Login 页面
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
