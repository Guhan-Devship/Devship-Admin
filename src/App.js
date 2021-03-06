import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import ViewProduct from "./pages/ViewProduct";
import CreateMobile from "./pages/CreateMobile";
import ViewModel from "./pages/ViewModel";
import EditMobile from "./pages/EditMobile";
import Order from "./pages/Order/Order";
import OrderView from "./pages/Order/OrderView";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/product" element={<Products />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/view/:id" element={<ViewProduct />} />
        <Route path="/createMobile" element={<CreateMobile />} />
        <Route path="/viewModel/:id" element={<ViewModel />} />
        <Route path="/editModel/:id" element={<EditMobile />} />
        <Route path="/viewOrder/:id" element={<OrderView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
