import "./App.css";

import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/homepage/ProductList";
import ProductDetail from "./pages/productdetail/ProductDetail";
import SanAppbar from "./components/SanAppbar";
import Footer from "./components/Footer";
import ShoppingCart from "./pages/cartpage/ShoppingCart";
import Cancel from "./pages/checkout/Cancel";
import Success from "./pages/checkout/Success";
import Register from "./components/authentication/Register";
import { Box } from "@mui/material";
import Login from "./components/authentication/Login";

function App() {
  return (
    <Box>
      <SanAppbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      <Footer />
      <Register />
      <Login />
    </Box>
  );
}

export default App;
