import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import ForgotPasswordForm from './Pages/ForgotPassword';
import ResetPasswordForm from './Pages/ResetPassword';
import PaymentForm from './Pages/Payment';
import AboutUsPage from './Pages/AboutUs';
import PaymentSuccess from './pages/PaymentSuccess';

import { HomePage } from "./pages/HomePage";
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ProductDetail } from './pages/ProductDetail';
import { HomeHeader } from "./components/HomeHeader";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App bg-light">
      <Header/>
      <Routes>
        
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />

        {/* Payment & Info */}
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* Shop */}
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/about" element={<AboutUsPage/>}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* 404 Fallback */}
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
