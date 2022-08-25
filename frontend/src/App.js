
import './App.css';
import Login from './components/login/login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home.js/Home';
import Cart from './components/cart/Cart';
import Order from './components/orders/Order';
import Wish from './components/wish/Wish';
import Admin from './components/adminDashboard/AdminDash';
import Users from './components/adminDashboard/users/Users';
import Products from './components/adminDashboard/products/Products';
import Orders from './components/adminDashboard/orders/Orders'
import Discount from './components/adminDashboard/discount/Discount';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/wish" element={<Wish />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/discount" element={<Discount />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
