import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import PlansPage from "./pages/PlansPage.jsx";
import FoodDetailsPage from "./pages/FoodDetailsPage.jsx";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ChatWidget from "./components/chat/ChatWidget.jsx";
import "./App.css";

function App() {
  const location = useLocation();

  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(location.pathname.toLowerCase()) || location.pathname.toLowerCase().startsWith("/reset-password");

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/menu"
          element={<MenuPage />}
        />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/food/:id"
          element={
            <FoodDetailsPage />
          }
        />
      </Routes>
      {!isAuthPage && <ChatWidget />}
    </div>
  );
}

export default App;
