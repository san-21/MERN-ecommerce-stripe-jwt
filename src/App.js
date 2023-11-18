import "./App.css";

import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/homepage/ProductList";
import ProductDetail from "./pages/productdetail/ProductDetail";
import SanAppbar from "./components/SanAppbar";
import Footer from "./components/Footer";
import ShoppingCart from "./pages/cartpage/ShoppingCart";
import Cancel from "./pages/checkout/Cancel";
import Success from "./pages/checkout/Success";

import { Box } from "@mui/material";
import LogIn from "./components/auth/LogIn";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import SignUp from "./components/auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

function App() {
  return (
    <Box>
      <SanAppbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>

      <Footer />
      <SignUp />
      <LogIn />
      <ToastContainer />
      <ForgotPassword />
    </Box>
  );
}

export default App;
