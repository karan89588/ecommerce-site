import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import Contact from "./pages/contact";
import Policy from "./pages/policy";
import Pagenotfound from "./pages/pagenotfound";
import Register from "./pages/register";
import Login from "./pages/login";
import PrivateRoute from "./components/Routes/private";
import ForgetPassword from "./pages/forgetpassword";
import AdminRoute from "./components/Routes/admin";
import AdminDashboard from "./pages/admin/bashboard";
import CreateCategory from "./pages/admin/createCategory";
import CreateProduct from "./pages/admin/createProduct";
import Users from "./pages/admin/users";
import UserDashboard from "./pages/user/dashboard";
import Orders from "./pages/user/orders";
import Products from "./pages/admin/products";
import UpdateProduct from "./pages/admin/updateProduct";
import Search from "./pages/search";
import ProductDetail from "./pages/productDetail";
import Categories from "./pages/categories";
import Category from "./pages/category";
import CartPage from "./pages/cartPage";
import Profile from "./pages/user/profile";
import AdminOrders from "./pages/admin/adminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/user/profile" element={<Profile />} />
          <Route path="/dashboard/user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            path="/dashboard/admin/create-category"
            element={<CreateCategory />}
          />
          <Route
            path="/dashboard/admin/create-product"
            element={<CreateProduct />}
          />
          <Route path="/dashboard/admin/show-users" element={<Users />} />
          <Route path="/dashboard/admin/orders" element={<AdminOrders />} />
          <Route path="/dashboard/admin/products" element={<Products />} />
          <Route
            path="/dashboard/admin/products/:slug"
            element={<UpdateProduct />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
