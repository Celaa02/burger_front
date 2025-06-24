import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import MenuUser from "./pages/Menu";
import Order from "./pages/Order";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <MenuUser />
            </PrivateRoute>
          }
        />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </Router>
  );
}


